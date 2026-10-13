const SUPABASE_URL = "https://gjjyomaqrhtszjtfdumy.supabase.co";
const SUPABASE_KEY = "sb_publishable_KwRmtEQg2PpMuQpgpRrC0w_pfDEPwey"

console.log("SUPABASE_URL =", SUPABASE_URL);


const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const productList = document.querySelector("#product-list");

async function loadProducts() {
    console.log("오라클 확인: loadProducts 함수 실행됨");

    productList.innerHTML = "<p>상품을 불러오는 중...</p>";

    const { data, error } = await supabaseClient
        .from("products")
        .select("number, name, image, link")
        .order("number", { ascending: false });
        console.log("상품 조회 결과:", data);
console.log("상품 조회 오류:", error);
console.log("조회한 상품 개수:", data?.length);

    if (error) {
        console.error("상품 불러오기 오류:", error);
        productList.innerHTML = "<p>상품을 불러오지 못했어요.</p>";
        return;
    }

    productList.innerHTML = "";

    data.forEach(function(product) {

        const productHTML = `
            <a href="${product.link}" target="_blank"
               rel="noopener noreferrer"
               class="product-link">

                <div class="product">

                    <img src="${product.image}" class="product-image">

                    <div class="product-number">
                        ${product.number}
                    </div>

                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div class="product-button">
                        🛒 상품 보러가기
                    </div>

                </div>

            </a>
        `;

        productList.innerHTML += productHTML;
    });
}

loadProducts();

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("input", function() {
    const searchNumber = searchInput.value.trim();
    const products = document.querySelectorAll(".product");

    products.forEach(function(product) {
        const number = product
            .querySelector(".product-number")
            .textContent.trim();

        if (number.includes(searchNumber)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});