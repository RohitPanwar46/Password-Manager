import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCopy, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';


const PasswordManager = () => {

  const [form, setForm] = useState({ url: '', username: '', password: '' });
  const [passwords, setPasswords] = useState([]);
  const [disabled, setDisabled] = useState(true)
  const [showpassword, setShowpassword] = useState(false)

  const inputRef = useRef(null);

  useEffect(() => {
    let data = localStorage.getItem('passwords');
    if (data) {
      setPasswords(JSON.parse(data));
    }

  }, [])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const savepassword = () => {
    setPasswords([...passwords, { ...form, id: uuidv4() }])
    localStorage.setItem('passwords', JSON.stringify([...passwords, { ...form, id: uuidv4() }]));
    toast('Password saved successfully')
    setForm({ url: '', username: '', password: '' })
  }
  const handleshowpassword = () => {
    setShowpassword(true)
    inputRef.current.type = "text"
  }
  const handlehidepassword = () => {
    setShowpassword(false)
    inputRef.current.type = "password"
  }
  const Copy = (text) => {
    toast('Copied to clipboard')

    navigator.clipboard.writeText(text)
  }
  const deletePassword = (id) => {
    toast('Password deleted successfully')
    let Confirm = confirm("Are you realy want to delete this password")
    if (Confirm) {
      setPasswords(passwords.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwords.filter(item => item.id !== id)))
    }
  }
  const editPassword = (id) => {
    const passwordToEdit = passwords.find((item) => item.id === id);
    const updatedPasswords = passwords.filter((item) => item.id !== id);

    setForm(passwordToEdit);
    setPasswords(updatedPasswords);
  }



  useEffect(() => {
    if (form.username === '' || form.password === '' || form.url === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [form])




  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={"Bounce"}
      />
      {/* Same as */}
      <ToastContainer />
      <div className="overflow-x-hidden absolute top-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Password Manager
        </h1>
        <div className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              URL:
            </label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter website URL"
              name="url"
              value={form.url}
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username:
            </label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter username"
              name="username"
              value={form.username}
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              ref={inputRef}
              type="password"
              onChange={handleChange}
              placeholder="Enter password"
              name="password"
              value={form.password}
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {showpassword == true && <FontAwesomeIcon onClick={() => { handlehidepassword() }} icon={faEye} className="absolute top-9 right-3" />}
            {showpassword == false && <FontAwesomeIcon onClick={() => { handleshowpassword() }} icon={faEyeSlash} className="absolute top-9 right-3" />}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            onClick={() => { savepassword() }}
            disabled={disabled}
            className={disabled ? "w-full flex gap-2 items-center justify-center px-4 py-2 bg-gray-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" : "w-full flex gap-2 items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"}
          ><div className="flex justify-center items-center">
              <div className="group relative w-10 h-10">
                {/* Background Animation */}
                <div className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-md scale-0 group-hover:scale-100 transition-transdiv duration-300"></div>
                {/* Save Icon */}
                <svg
                  className="absolute top-0 left-0 w-full h-full text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 11h8m-8 4h5"
                  />
                </svg>
              </div>
            </div>
            Save
          </button>
        </div>
      </div>
      <div className="font-bold mx-auto w-32 mt-5">
        Your Passwords
      </div>
      {passwords.length == 0 && <div className="w-50 mt-5 text-center mx-auto">Nothing to show passwords</div>}
      {passwords.length != 0 &&
        <div className="Table mt-8  overflow-x-hidden">
          <table className="mx-auto md:w-[90vw] my-2 overflow-hidden rounded-lg" >
            <thead>
              <tr className="bg-sky-600 ">
                <th>Url</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            {passwords.map((item) => {
              return <tbody key={item.id} className="bg-sky-400">
                <tr>
                  <td className="text-center">{item.url}&nbsp; <FontAwesomeIcon className="cursor-pointer hidden md:inline-block" onClick={() => { Copy(item.url) }} icon={faCopy} /></td>
                  <td className="text-center">{item.username}&nbsp; <FontAwesomeIcon className="cursor-pointer hidden md:inline-block" onClick={() => { Copy(item.username) }} icon={faCopy} /></td>
                  <td className="text-center">{item.password}&nbsp; <FontAwesomeIcon className="cursor-pointer hidden md:inline-block" onClick={() => { Copy(item.password) }} icon={faCopy} /></td>
                  <td className="text-center"><FontAwesomeIcon onClick={() => { editPassword(item.id) }} className="cursor-pointer" icon={faPenToSquare} />&nbsp; &nbsp; <FontAwesomeIcon onClick={() => { deletePassword(item.id) }} className="cursor-pointer" icon={faTrash} /></td>
                </tr>
              </tbody>
            })}
          </table>
        </div>
      }
    </>
  );
};

export default PasswordManager;
