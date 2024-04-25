async function getSearchData(url)
{
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    return data;
}
async function main()
{
  let name = search.value;
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name;
  let data = await getSearchData(url);
  data = data.drinks;
  SearchResults.innerHTML = "";
  const cat = Array.from(document.querySelectorAll("input[type=checkbox]")).filter(i => i.checked).map(i => i.value);
  if (cat.length > 0)
  data = data.filter(function(i){
    if (cat.includes(i.strCategory))
    {
      return i;
    }
  });
  data.forEach(e => {
    const ele = document.createElement('div');
    ele.classList.add('res');
    {
      const help = document.createElement('aside');
      const img = document.createElement('img');
      img.src = e['strDrinkThumb'];
      help.appendChild(img);
      ele.appendChild(help);
    }
    {
      const help = document.createElement('section');
      const div = document.createElement('div');
      div.innerHTML = e['strDrink'];
      const article = document.createElement('article');
      const ingList = [];
      for (let i = 1; i < 16; i++) 
      {
        if (e[`strIngredient${i}`])
        {
          ingList.push(e[`strIngredient${i}`]);
        }
        else break;
      }
      article.innerHTML = `Ingredients: ${ingList.join(', ')}`;
      help.appendChild(div);
      help.appendChild(article);
      ele.appendChild(help);
    }
    SearchResults.appendChild(ele);
  });
}

search.addEventListener("keypress", async function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    main();
  }
});
const nodes = document.querySelectorAll("input[type=checkbox]");
for (const i of nodes) {
  console.log(i);
  i.addEventListener("change", main);

}