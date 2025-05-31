import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  let [length, setLength] = useState(8)
  let [numberAllowed, setNumberAllowed] = useState(false)
  let [charAllowed, setCharAllowed] = useState(false)
  let [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
   
  
  
  }, [password])
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_=+[]{}`~"
  
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
  
    }
    setPassword(pass)
  
  }, [length, numberAllowed, charAllowed, setPassword])
  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])




return (
  <>
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my8 text-black-500 bg-gray-800 ">
        <h1 className='text-white text-center mt-2 text-4xl py-4'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-2 px-4 bg-white text-xl ' placeholder='Password' readOnly ref={passwordRef} />
          <button className='bg-blue-500 p-3 hover:cursor-pointer' onClick={copyPassToClipboard} >Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className=" flex items-center text-white gap-x-1 pb-2" >
            <input type="range"
              min={6} max={20} value={length} className='cursor-pointer ' onChange={(e) => {
                setLength(e.target.value)
              }} />
            <label className=' mr-4'>Length : {length}</label>


            <input type="checkbox" className='' checked={numberAllowed} id='numberInput' onChange={(e) => setNumberAllowed(e.target.checked)} />
            <label className="mr-4">Numbers</label>

            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={(e) => setCharAllowed(e.target.checked)} />
            <label htmlFor="">Characters</label>

          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default App
