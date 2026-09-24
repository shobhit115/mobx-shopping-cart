import { useState } from "react";

export default function Form(){
    const [ans,setAns] = useState('');
    const [err,setErr] = useState(null);
    const [status,setStatus] = useState('typing');


    if(status === 'success') {
        return <h1>That's right!</h1>
    }

    async function handleSubmit(e){
        e.preventDefault();
        setStatus('submitting');
        try{
            await submitForm(ans);
            setStatus('success');
        }
        catch(err){
            setStatus('typing');
            setErr(err);
        }

    }
    function handleTextareaChange(e){
        setAns(e.target.value);
    }

    return (
        <>
        <h2>ques?</h2>
        <form onSubmit={handleSubmit}>
            <textarea 
                value={ans}
                onChange={handleTextareaChange}
                disabled={status === 'submitting'}
            />
            <br/>
            <button disabled={
                ans.length===0 || status === 'submitting'
            }>submit</button>

            {err!=null && <p>{err.message}</p>}
        </form>
        </>
    )
}



function submitForm(ans){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = ans.toLowerCase() !== 'ans'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}