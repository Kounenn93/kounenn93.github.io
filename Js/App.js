// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUUlBk_1Qynuf57TjpCa1iVwF551VCHTc",
    authDomain: "orderdemo-948c3.firebaseapp.com",
    projectId: "orderdemo-948c3",
    storageBucket: "orderdemo-948c3.appspot.com",
    messagingSenderId: "799614623104",
    appId: "1:799614623104:web:92afecd0123b25b5c33565",
    measurementId: "G-ZFVTVVKK3S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ordersRef = database.ref('orders');

// Order class
class Order {
    constructor(name, item, addition, size, sugar, ice, price) {
        this.name = name;
        this.item = item;
        this.addition = addition;
        this.size = size;
        this.sugar = sugar;
        this.ice = ice;
        this.price = price;
    }
}

// DOM Elements
const orderForm = document.getElementById('orderForm');
const orderTableBody = document.getElementById('orderTableBody');
const totalPriceElement = document.getElementById('totalPrice');

// Submit order
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const order = new Order(
        document.getElementById('name').value,
        document.getElementById('item').value,
        document.getElementById('addition').value,
        document.getElementById('size').value,
        document.getElementById('sugar').value,
        document.getElementById('ice').value,
        document.getElementById('price').value
    );
    
    // Push order to Firebase
    ordersRef.push(order);

    // Reset form
    orderForm.reset();
    document.getElementById('size').value = 'L';
    document.getElementById('sugar').value = '微糖';
    document.getElementById('ice').value = '微冰';
});

// Listen for changes in Firebase
ordersRef.on('value', (snapshot) => {
    const data = snapshot.val();
    orderTableBody.innerHTML = '';
    let totalPrice = 0;

    if (data) {
        Object.values(data).forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${order.name}</td>
                <td>${order.item}</td>
                <td>${order.addition}</td>
                <td>${order.size}</td>
                <td>${order.sugar}</td>
                <td>${order.ice}</td>
                <td>${order.price}</td>
            `;
            orderTableBody.appendChild(row);
            totalPrice += parseFloat(order.price || 0);
        });
    }

    totalPriceElement.textContent = totalPrice;
});



