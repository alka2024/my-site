/* =========================================
   画像スライダー動作JavaScript
   ========================================= */

let currentImageIndex = 0; // 現在表示中の画像インデックス
const totalImages = 5; // 画像の総数

const sliderContainer = document.getElementById('imageSlider');
const indicatorDots = document.querySelectorAll('.indicator');

// スライダーの表示を更新する関数
function updateSliderView() {
    // コンテナを横にずらす（インデックス * 100%）
    sliderContainer.style.transform = `translateX(-${currentImageIndex * 100}%)`;

    // インジケーター（ドット）のactiveクラスを切り替え
    indicatorDots.forEach((dot, index) => {
        if (index === currentImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ボタン押下時の処理 (direction: 1は次へ, -1は前へ)
function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
    updateSliderView();
}

// インジケーター（ドット）クリック時の処理
function jumpToImage(index) {
    currentImageIndex = index;
    updateSliderView();
}

// 自動スライド（5秒ごと、必要なければコメントアウトまたは削除）
let autoSlide = setInterval(() => changeImage(1), 5000);

// マウスが乗った時に自動スライドを停止し、離れたら再開（ユーザー体験向上）
const sliderOuter = document.querySelector('.slider-outer');
if(sliderOuter) {
    sliderOuter.addEventListener('mouseover', () => clearInterval(autoSlide));
    sliderOuter.addEventListener('mouseout', () => autoSlide = setInterval(() => changeImage(1), 5000));
}