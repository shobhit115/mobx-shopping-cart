import {useState} from 'react';
function UserList() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
  if (loading) return <p>Loading the users...</p>

  if (error) {
    return <p>error : {error}</p>
  }
  return (
    <div>
      <h2> users</h2>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.username} ({user.email})</li>
        ))}
      </ul>
    </div>
  )
}
export default function Cards(){
    const [active,setActive] = useState(0);

    return (
        <>
        <h1>Cards</h1>
        <Panel title="card_1" onShow={()=>setActive(1)} isActive={active===1}>card 1 Details</Panel>
        <Panel title="card_2" onShow={()=>setActive(2)} isActive={active===2}>card 2 Details</Panel>
        <Panel title="card_3" onShow={()=>setActive(3)} isActive={active===3}>card 3 Details</Panel>
        <Panel title="card_4" onShow={()=>setActive(4)} isActive={active===4}>card 4 Details</Panel>

        </>
    )
}

function Panel({title,children, onShow,isActive}){
    return (
        <>
            <h4>{title}</h4>
            {isActive ? (<p>{children}</p>) : (<button onClick={onShow}>Show</button>) }
        </>
    )
}