const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link')

  const getData = () => {
      fetch('/db/db.json')
   .then((response) =>  res.json())
   .then((data) => {
         //console.log(data);
   })
  }

  
}
 export default getGoods