import { getPath, setHref } from "./url";

const search = function() {
  const input = document.querySelector('.search-block > input') as HTMLTextAreaElement;
  const searchBtn = document.querySelector('.search-block > button');
  
  try {
    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');

        goodsContainer.innerHTML = ""

        goods.forEach(good => {
          const goodsBlock = document.createElement('div');

          goodsBlock.classList.add('col-lg-3');
          goodsBlock.classList.add('col-lg-6');

          const imgLinks = ((ctx) => ctx.keys().map(ctx))(
            require.context("../db/img", true, /.*/)
          );

          goodsBlock.innerHTML = `
              <div class="goods-card">
                <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
                <!-- /.label --><img src="./src/db/${good.img}" alt="image: Hoodie" class="goods-image">
                <h3 class="goods-title">${good.name}</h3>
                <!-- /.goods-title -->
                <p class="goods-description">${good.description}</p>
                <!-- /.goods-description -->
                <!-- /.goods-price -->
                <button class="button goods-card-btn add-to-cart" data-id="007">
                  <span class="button-price">$89</span>
                </button>
              </div>
              <!-- /.goods-card -->
          `
          
          goodsContainer.append(goodsBlock);
        })
      }
      
      const getData = (value: string, category: string) => {
        return new Promise((resolve, reject) => {
          fetch('https://willberries-26280-default-rtdb.firebaseio.com/db.json')
          .then((res) => res.json())
          .then((data) => {
              const array = data.filter(good => good.name.toLowerCase().includes(value.toLowerCase()));

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

    searchBtn.addEventListener('click', () => {
      getData(input.value, '');
    });
  } catch (e) {
    console.error(e);
  }
}
search();
