console.log(`

Всего баллов: 100

    Вёрстка валидная +10

    Вёрстка семантическая +16

    Вёрстка соответствует макету +54
        блок <header> +8:
        секция Welcome +4.
        секция About +6:
        секция Favorites +8:
        секция CoffeShop +6.
        секция Contacts +6:
        секция LibraryCard +8:
        блок <footer> +8:
        
        Общие требования к верстке +20
        `)

const humburgerBtn = document.querySelector('.humburger_btn'),
      nav = document.querySelector('nav ul');
      header = document.querySelector('header');
      humburgerLines = document.querySelectorAll('.humburger_line');
humburgerBtn.addEventListener('click', (event)=>{
    if (humburgerBtn.classList.contains('touched') && event.target !=nav) {
        nav.style.display = 'none';
        humburgerBtn.classList.remove('touched');
        humburgerLines[0].style.display = 'block';
        humburgerLines[1].style.transform =''
        humburgerLines[2].style.transform =''

    } else {
        nav.style.display = 'flex';
        humburgerBtn.classList.add('touched');
        humburgerLines[0].style.display = 'none';
        humburgerLines[1].style.transform ='rotate(45deg)'
        humburgerLines[2].style.transform ='rotate(-45deg) translateX(5px) translateY(-5px)'

        }
  console.log(event.target)
})
