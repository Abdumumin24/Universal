document.getElementById('laptop-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Input qiymatlarini olish
  const laptopName = document.getElementById('laptop-name').value;
  const laptopSpecs = document.getElementById('laptop-specs').value;
  const laptopPrice = document.getElementById('laptop-price').value;

  // Noutbuk ma'lumotlarini serverga yuborish
  const response = await fetch('/laptops', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: laptopName,
          specs: laptopSpecs,
          price: laptopPrice
      }),
  });

  const laptop = await response.json();

  // Ro'yxatni yangilash
  addLaptopToList(laptop);

  // Formani tozalash
  document.getElementById('laptop-form').reset();
});

// Noutbuk ro'yxatiga qo'shish funksiyasi
function addLaptopToList(laptop) {
  const li = document.createElement('li');
  li.textContent = `${laptop.name} - ${laptop.specs} - ${laptop.price} $`;
  document.getElementById('laptop-list').appendChild(li);
}

// Barcha noutbuklarni yuklash
async function loadLaptops() {
  const response = await fetch('/laptops');
  const laptops = await response.json();

  laptops.forEach(addLaptopToList);
}

// Boshlang'ich yuklash
loadLaptops();
