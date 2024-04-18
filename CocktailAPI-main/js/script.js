async function getSearchData(url)
{
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      let name = search.value;
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name;
      let data = getSearchData(url);
      console.log(data);
      Array.from(data).forEach(element => {
        console.log(element.idDrink);
      });
    }
  });