const creator = {
  avatar: "https://1pay.network/assets/dist/imgs/fav.png",
  name: "1pay",
};

const feeds = [
  {
    id: 1,
    creator: creator,
    fromNow: "22 day",
    title: "Launched 1pay.network",
    description: "",
    url: "",
    image: "https://1pay.network/assets/images/profit.png",
  },
  {
    id: 2,
    creator: creator,
    fromNow: "27 day",
    title: "Changing the way you pay",
    description:
      "1pay.network is a payment gateway that allows you to pay for goods and services with cryptocurrency. We are currently accepting payments in Bitcoin, Ethereum, Litecoin, and Dogecoin. We are working on adding more cryptocurrencies in the future.",
    image: "",
  },
  {
    id: 3,
    creator: creator,
    fromNow: "27 day",
    title: "hey everyone!",
    description: "",
    url: "",
    image: "",
  },
];

const feedSection = document.querySelector("#feeditems");
feeds.forEach((feed) => {
  const item = document.createElement("div");
  item.innerHTML = `
    <div class="feeditem">
        <div class="flex items-center" style="gap: 8px;">
            <img src="${feed.creator.avatar}" class="profile-img" />
            <div class="flex items-center" style="gap: 3px;">
                <p class="font-bold">${feed.creator.name}</p> 
                <span class="feeditem-time text-nowrap"> · ${
                  feed.fromNow
                }</span>
            </div>
        </div>
        <div class="feeditem-media">
            <p class="feeditem-caption">${feed.title}</p>
            ${
              feed.description &&
              `<p class="feeditem-description">${feed.description}</p>`
            }
            ${
              feed.image &&
              `<img src="${feed.image}" loading="lazy" class="feeditem-image" />`
            }
        </div>
    </div>
  `;
  feedSection.appendChild(item);
});

const posts = [
  {
    image: "https://1pay.network/assets/images/fill.png",
    title: "Hello guys",
    created: "25 Tha 2022",
    isRecorver: false,
    isPrivate: false,
  },
  {
    image: "https://1pay.network/assets/images/pay.png",
    title: "update smile",
    created: "15 Tha 2022",
    isRecorver: false,
    isPrivate: false,
  },
  {
    image: "https://storage.ko-fi.com/cdn/useruploads/supporteronly2.png?v=5",
    title: "New docs just dropped!",
    created: "7 Tha 2022",
    isRecorver: true,
    isPrivate: false,
  },
];
const postSection = document.querySelector("#postitems");
posts.forEach((post) => {
  const item = document.createElement("div");
  item.innerHTML = `
    <div class="postitem flex">
        <img src="${post.image}" class="postitem-image" />
        <div>
            <p class="postitem-title">${post.title}</p>
            <div>
                <span style="display: inline-block; margin-right: 8px" class="postitem-time">${
                  post.created
                }</span>
                ${post.isRecorver ? `<i class="fa-solid fa-rotate"></i>` : ""}
                ${post.isPrivate ? `<i class="fa-solid fa-lock"></i>` : ""}
            </div>
        </div>
    </div>
  `;
  postSection.appendChild(item);
});

// From buycoffee
const inputQuality = document.getElementById("inputQuality");
const inputMoney = document.getElementById("inputMoney");
const buycoffeBtn = document.getElementById("buycoffeBtn");

function amountValid(amount) {
  if (Number.isNaN(amount) || amount <= 0) {
    buycoffeBtn.disabled = true;
    document.getElementById("moneyMessage").innerHTML =
      "Please enter at least $5";
    return false;
  } else {
    buycoffeBtn.disabled = false;
    document.getElementById("moneyMessage").innerHTML = "";
    return true;
  }
}

let amount;

function onMoneyChange(value) {
  amount = Number(value);
  amountValid(amount);
  buycoffeBtn.innerHTML = `Tip $${amount}`;
  inputQuality.value =
    amount === 0 ? 0 : amount < 5 ? 1 : Math.floor(amount / 5);
}

function onQualityChange(value) {
  const amount = Number(value);
  amountValid(amount);
  inputMoney.value = amount * 5;
  buycoffeBtn.innerHTML = `Tip $${inputMoney.value}`;
  inputQuality.value = value;
}

function decreaseQuality() {
  const quality = inputQuality.value - 1;
  if (quality < 0) return;
  onQualityChange(quality);
}
function increaseQuality() {
  const quality = Number(inputQuality.value) + 1;
  onQualityChange(quality);
}

function onTip() {
  if (amountValid(amount)) {
    window.onepay(amount, "usdt");
  }
}
