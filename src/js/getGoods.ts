import { getPath, setHref } from "./url";

const imgLinks = ((ctx) => ctx.keys().map(ctx))(
  require.context("../db/img", true, /.*/)
  );
  
  const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');
    
    const renderGoods = (goods) => {
      const goodsContainer = document.querySelector('.long-goods-list');
      
    goodsContainer.innerHTML = "";

    goods.forEach(good => {
      const goodsBlock = document.createElement('div');

      goodsBlock.classList.add('col-lg-3');
      goodsBlock.classList.add('col-lg-6');

      goodsBlock.innerHTML = `
          <div class="goods-card">
            <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
            <!-- /.label --><img src="./src/db/${good.img}" alt="image: Hoodie" class="goods-image">
            <h3 class="goods-title">${good.name}</h3>
            <!-- /.goods-title -->
            <p class="goods-description">${good.description}</p>
            <!-- /.goods-description -->
            <!-- /.goods-price -->
            <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
              <span class="button-price">$${good.price}</span>
            </button>
          </div>
          <!-- /.goods-card -->
      `

      goodsContainer.append(goodsBlock);
    })
  }
  
  const getData = (value, category) => {
    return new Promise((resolve, reject) => {
      fetch('https://willberries-26280-default-rtdb.firebaseio.com/db.json')
        .then((res) => res.json())
        .then((data) => {
          const array = category ? data.filter((item) => item[category] === value) : data;
          
          localStorage.setItem('goods', JSON.stringify(array));
          
          if (window.location.pathname !== getPath()) {
            setHref('/goods.html');
          } else {
            renderGoods(array);
          }
          
          return resolve(array);
        })
        .catch(() => {
          reject('fetch failed');
        });
      });
  }
  
  links.forEach((link: HTMLElement) => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;

      getData(linkValue, category)
    })
  });
  
  if (localStorage.getItem('goods') && window.location.pathname === getPath()) {
    renderGoods(JSON.parse(localStorage.getItem('goods')))
  }

  // View All
  if (window.location.pathname !== getPath()) {
    const viewAllBtn = document.querySelector('.more');
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      getData('', '');
      renderGoods(JSON.parse(localStorage.getItem('goods')));
    });
  }
}
getGoods();
