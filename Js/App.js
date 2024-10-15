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
const lockRef = database.ref('lockState');



const drinkShops = [
    "可不可",
    "初韻",
    "花火禾茶",
    "50嵐",
    "清心福全",
    "五桐號",
    "迷克夏",
    "得正",
    "馬祖奶茶",
    "龜記",
    "Tea's原味",
    "茗茗究市",
    "黛黛茶",
    "吾奶王",
    "先喝道"
];

const menuImages = {
    "可不可": "https://scontent.ftpe8-1.fna.fbcdn.net/v/t1.6435-9/151694674_1375703942782633_4336374888345392067_n.png?_nc_cat=109&ccb=1-7&_nc_sid=dcae5c&_nc_ohc=v-6oXgTh4RoQ7kNvgHu5gIm&_nc_ht=scontent.ftpe8-1.fna&_nc_gid=AG-dOpfLZe-rracGYss-Y6t&oh=00_AYDCa5uTsEacemQ-Tw3SvnA9o8h9XMLp_9bs-vRYDP8qAg&oe=67342727",
    "初韻": "https://truewin2018.com.tw/wp-content/uploads/2024/07/240726_%E5%88%9D%E9%9F%BB-A3%E8%8F%9C%E5%96%AE-%E4%B8%AD%E8%8B%B1%E3%80%81%E7%86%B1%E9%87%8F_%E9%81%A9%E7%94%A8%E7%8F%BE%E5%A0%B4.jpg",  // 請替換為實際的圖片URL
    "花火禾茶": "https://picdn.gomaji.com/uploads/stores/226/205226/333394/0811%E8%8A%B1%E7%81%AB%E7%A6%BE%E8%8C%B6a5%E8%8F%9C%E5%96%AE_210x148mm_8192%E5%83%8F%E7%B4%A0-(1).jpg",  // 請替換為實際的圖片URL
    "50嵐": "https://i0.wp.com/timmyblog.cc/wp-content/uploads/20220305172126_11.jpg?w=1280&quality=99&ssl=1",  // 請替換為實際的圖片URL
    "清心福全": "https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2024/07/14/20240714-031348_U16224_M969465_8707.jpg?BSgorJjqvDfzasJYpORRU90VjP8R6CCj&itok=gERpAvWN",  // 請替換為實際的圖片URL
    "五桐號": "https://www.wootea.com/upload/menu_b/ALL_menu_24E24_38etmdmmv9.jpeg",  // 請替換為實際的圖片URL
    "迷克夏": "https://cdn.myfeel-tw.com/media/AD_4nXd1HLXqpoPs4uJxJhynxCBGNbVZKwdgUPytGWfHd9_8cQSJ4wmfA6nDepryMnXwX-MzWvbGL_e1hNOFhoLoL1a1hFUHYFRlYyXya1Vm_-WblIXV6VNFTyxhqxr6mGOFG5VBdU_0yagH4Z1Szt-M7umsTLVV.jpg",  // 請替換為實際的圖片URL
    "得正": "https://cc.tvbs.com.tw/img/program/upload/2024/07/04/20240704180735-356e3bfe.jpg",  // 請替換為實際的圖片URL
    "馬祖奶茶": "https://sansalife.com/wp-content/uploads/pixnet/1654404921-3347409087-g_l.jpg",  // 請替換為實際的圖片URL
    "龜記": "https://cdn.myfeel-tw.com/media/O19LupQsCnF9S5DtjYGu2TLzxxmXeIANNStLRG4N.webp",  // 請替換為實際的圖片URL
    "Tea's原味": "https://achingfoodie.tw/wp-content/uploads/20230115230819_89.png",  // 請替換為實際的圖片URL
    "茗茗究市": "https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.6435-9/182699260_276546434178188_1464785731501327489_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=532cfa&_nc_ohc=6hC7KMRNS8MQ7kNvgE_l1gP&_nc_ht=scontent.ftpe7-4.fna&_nc_gid=A9eolNgFy84DmhUnWr-0UIm&oh=00_AYCkJeeNkUY7lG77jjcKR8C4vCaN6GB_4snhRv6xMD6pSw&oe=6734733C",  // 請替換為實際的圖片URL
    "黛黛茶": "https://scontent.ftpe7-1.fna.fbcdn.net/v/t39.30808-6/305570562_534770135207756_3963970546519101449_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=532cfa&_nc_ohc=fT5Di-rgPLAQ7kNvgEqtPBR&_nc_ht=scontent.ftpe7-1.fna&_nc_gid=AByoV0MLVq9CpR8HmWdgmbW&oh=00_AYAJxI1-eVkbS_e9zwgsEc2aYIdIwjyKhS2O86cH1Ze1VA&oe=6712D4C0",  // 請替換為實際的圖片URL
    "吾奶王": "https://scontent.ftpe7-1.fna.fbcdn.net/v/t39.30808-6/460959934_492252907118616_2077491672881086434_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=h3t8hdSrBRwQ7kNvgE4t8Hi&_nc_ht=scontent.ftpe7-1.fna&_nc_gid=AFox_QXfuAYt76btcyuH2QE&oh=00_AYB6KjkAyRkTlIqf3tnrmUWmByZ9FLPgS_0MLvsvXSy9ig&oe=6712E74B",  // 請替換為實際的圖片URL
    "先喝道": "https://shoplineimg.com/6625caf3b4df420073885d89/66fbae217baa47000e236603/2600x.webp?source_format=jpg"  // 請替換為實際的圖片URL
};

function selectRandomShop() {
    const randomIndex = Math.floor(Math.random() * drinkShops.length);
    const selectedShop = drinkShops[randomIndex];

    // 將隨機選擇的結果儲存到 Firebase
    lockRef.set({
        isLocked: false, // 這裡設為未鎖定狀態
        shop: selectedShop
    });

    // 本地更新畫面
    document.getElementById('result').textContent = `今天就去 ${selectedShop} 吧！`;
    document.getElementById('menuImage').src = menuImages[selectedShop];
    document.getElementById('menuImage').style.display = 'block';
    
    // 顯示鎖定按鈕
    document.getElementById('lock').style.display = "inline-block";
}

function lockSelection() {
    const selectedShop = document.getElementById('result').textContent.replace('今天就去 ', '').replace(' 吧！', '');

    // 將鎖定狀態推送到 Firebase，並保持飲料店不變
    lockRef.set({
        isLocked: true,
        shop: selectedShop
    });

    // 本地更新按鈕狀態
    lockButtonState();
}

function lockButtonState() {
    document.getElementById('randombutton').disabled = true;
    document.getElementById('lock').disabled = true;
    
    const lockButton = document.getElementById('lock');
    lockButton.style.backgroundColor = "#A45D66";
    lockButton.style.color = "#FFF3E3";
    lockButton.textContent = "已鎖定";
    lockButton.style.cursor = "not-allowed";

    const rdButton = document.getElementById('randombutton');
    rdButton.style.cursor = "not-allowed";
}

// 監聽 Firebase 中 lockState 的變化，所有使用者同步更新
lockRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // 顯示飲料店
        document.getElementById('result').textContent = `今天就去 ${data.shop} 吧！`;
        document.getElementById('menuImage').src = menuImages[data.shop];
        document.getElementById('menuImage').style.display = 'block';

        // 如果已經鎖定，則更新鎖定按鈕狀態
        if (data.isLocked) {
            lockButtonState();
        }
    }
});



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



