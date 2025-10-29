export const apiUrl='http://localhost:8000/api';
export const adminToken=()=>{
   
    const data=JSON.parse(localStorage.getItem('adminInfo'));
    return data.token;
}
export const userToken=()=>{
   
    const data=JSON.parse(localStorage.getItem('userInfo'));
    return data.token;
}

export const STRIPE_PUBLIC_KEY ="pk_test_51PvyleEmbA5ftyG8Y4DyJ9893lilRjsX96TY2DhIKoMu7zIeKXgMWjKfjd78qmvvt1lXk7JQ9KtKbJ2odIcif7Q100nuWJxE4W";
