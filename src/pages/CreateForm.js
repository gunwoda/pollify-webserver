import React, { useState, } from 'react'
import axios, { Axios } from 'axios';
import { data } from 'autoprefixer';
import Navbar from '../Components/Navbar';

export default function CreateForm() {
  const [formContent, setFormContent] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState("");
  const [formtitle, setFormtitle] = useState("");

  const addQuestion = () => {
    const field = {
      "name": `question_${formContent.length}`,
      "label": "Untitled question",
      "question_type": "subjective", // "multipletype",
      "list": []
    }
    setFormContent([...formContent, field]);
  }

  const Data = {
    "name" : formtitle,
    "duration" : 30,
    "visibility": true,
  }

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1){
      formFields[fieldIndex].label = fieldLabel;
      setFormContent(formFields);
    }
  }

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1){
      formFields[fieldIndex].question_type = fieldLabel;
      setFormContent(formFields);
    }
  }

  const addFieldOption =  (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1){
      if (option && option != ""){
        formFields[fieldIndex].list.push(option);
        setFormContent(formFields);
        setTextField("");
      }
    }
  }

  const postData = async () => {
    console.log({name : formtitle, surveydetails : formContent});
    try {
      const response = await axios.post('https://api.example.com/data', { 
        // 요청 본문 데이터를 객체 형태로 전달합니다.
        data : data,
        surveydetails: formContent
      });
      if (response.status == "success"){

      }
      console.log(response.data); // 성공적인 응답의 데이터를 콘솔에 출력합니다.
    } catch (error) {
      console.error(error); // 오류가 발생한 경우 콘솔에 출력합니다.
    }
  };

  const handleClick = () => {
    console.log("post");
    postData();
  };

  const handleChange = (event) => {
    setFormtitle(event.target.value);
  };

  return (
    <>
    <Navbar></Navbar>
    
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    
    <div className='container mx-auto px-4 h-screen'>
      <div className='flex flex-col w-full space-y-2 my-4'>
        <h1 className='text-2xl font-bold'>Create Form</h1>
        <h2 className='text-lg'>Form Title</h2>
        <input
        type="text"
        value={formtitle}
        onChange={handleChange}
      />
      </div>
      <div className='bg-white shadow-lg rounded-md p-5 my-10'>
        {
          formContent.map((field) => {
            return (
              <div>
                <div className='flex justify-between items-center space-y-2'>
                  <div key={field.name} className="block text-sm font-medium text-gray-700 capitalize">
                   {
                    onEdit && (editedField === field.name) ?
                    <input type="text" value={field.label} onChange={(e) => editField(field.name, e.target.value)} onBlur={() => {setOnEdit(false);setEditedField("")}} /> 
                    :
                     <label onClick={() => {setOnEdit(true); setEditedField(field.name)}}>{field.label}</label>
                   }
                  </div>
                  <div>
                    <select onChange={(e) => editFieldType(field.name, e.target.value)}>
                      <option value="subjective">Short Answer</option>
                      <option value="multipletype">multipletype</option>
                    </select>
                  </div>
                </div>

                <div className='my-4'>
                  {
                    field.question_type == 'subjective' && <input type="text" className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} />
                  }
                  {field.question_type == 'multipletype' &&
                    <div className='my-4 flex flex-col space-y-2'>
                      <select
                        className='px-5 shadow-sm h-10 rounded-md block w-full'>
                        {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                      </select>
                      <div className='flex space-between'>
                        <input type="text" onChange={(e) => setTextField(e.target.value)} value={textField} placeholder="Add an option" className='flex-1' />
                        <button className='bg-indigo-700 block hover:bg-indigo-900 text-white px-4' onClick={() => addFieldOption(field.name, textField) }>Add</button>
                      </div>
                    </div>
                  }
                </div>

              </div>
            )
          })
        }

        <div className='relative w-full p-5'>
          <div className='absolute inset-x-0 bottom-0 h-12 flex justify-center'>
            <button onClick={() => addQuestion()} className='inline-flex bg-gray-800 hover:bg-gray-700 items-center p-3 text-sm text-white rounded-md'>Add Question
            </button>
          </div>
        </div>
      </div>
      <button onClick={handleClick}>POST 요청 보내기</button>
      
    </div>
    </>
  )
}
