/* ============================================
   WEATHER APP - SCRIPT.JS
   JavaScript cơ bản, dễ hiểu cho người mới học
   
   Kiến thức sử dụng:
   - fetch() để gọi API
   - async/await để xử lý bất đồng bộ
   - DOM manipulation để thay đổi giao diện
   - LocalStorage để lưu dữ liệu
   ============================================ */

// ============================================
// PHẦN 1: LẤY CÁC ELEMENTS TỪ HTML
// ============================================

// Ô input và nút tìm kiếm
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

// Các phần hiển thị trạng thái
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const weatherCard = document.getElementById('weatherCard');

// Các ô hiển thị thông tin thời tiết
const cityName = document.getElementById('cityName');
const weatherDate = document.getElementById('weatherDate');
const weatherIcon = document.getElementById('weatherIcon');
const tempElement = document.getElementById('temp');
const weatherDesc = document.getElementById('weatherDesc');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feelsLike');

// Phần lịch sử
const historyList = document.getElementById('historyList');


// ============================================
// PHẦN 2: CÁC HÀM HIỂN THỊ TRẠNG THÁI
// ============================================

/**
 * Hiện trạng thái LOADING
 * - Ẩn error và weather card
 * - Hiện phần loading với spinner
 */
function showLoading() {
    // Ẩn các phần khác
    errorDiv.classList.add('hidden');
    weatherCard.classList.add('hidden');
    
    // Hiện loading
    loadingDiv.classList.remove('hidden');
}

/**
 * Hiện trạng thái ERROR
 * @param {string} message - Thông báo lỗi
 */
function showError(message) {
    // Ẩn loading và weather card
    loadingDiv.classList.add('hidden');
    weatherCard.classList.add('hidden');
    
    // Cập nhật thông báo lỗi
    errorMessage.textContent = message;
    
    // Hiện error
    errorDiv.classList.remove('hidden');
}

/**
 * Hiện trạng thái SUCCESS
 * @param {Object} data - Dữ liệu thời tiết từ API
 */
function showWeather(data) {
    // Ẩn loading và error
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    
    // Cập nhật thông tin hiển thị
    cityName.textContent = data.cityName;
    weatherDate.textContent = data.date;
    weatherIcon.textContent = data.icon;
    tempElement.textContent = data.temperature;
    weatherDesc.textContent = data.description;
    humidity.textContent = data.humidity + '%';
    wind.textContent = data.windSpeed + ' km/h';
    feelsLike.textContent = data.feelsLike + '°C';
    
    // Hiện weather card
    weatherCard.classList.remove('hidden');
}


// ============================================
// PHẦN 3: HÀM GỌI API LẤY THỜI TIẾT
// ============================================

/**
 * Lấy icon emoji tương ứng với mã thời tiết
 * @param {number} code - Weather code từ API
 * @returns {string} - Emoji icon
 */
function getWeatherIcon(code) {
    // Bảng mã thời tiết của Open-Meteo API
    // https://open-meteo.com/en/docs#weathervariables
    
    if (code === 0) return '☀️';           // Trời quang
    if (code === 1 || code === 2) return '🌤️'; // Ít mây
    if (code === 3) return '☁️';           // Nhiều mây
    if (code >= 45 && code <= 48) return '🌫️'; // Sương mù
    if (code >= 51 && code <= 55) return '🌧️'; // Mưa phùn
    if (code >= 56 && code <= 57) return '🌨️'; // Mưa phùn đông
    if (code >= 61 && code <= 65) return '🌧️'; // Mưa
    if (code >= 66 && code <= 67) return '🌨️'; // Mưa băng
    if (code >= 71 && code <= 77) return '❄️'; // Tuyết
    if (code >= 80 && code <= 82) return '🌦️'; // Mưa rào
    if (code >= 85 && code <= 86) return '🌨️'; // Tuyết rào
    if (code === 95) return '⛈️';          // Giông
    if (code >= 96 && code <= 99) return '⛈️'; // Giông + mưa đá
    
    return '🌈'; // Mặc định
}

/**
 * Lấy mô tả thời tiết tiếng Việt
 * @param {number} code - Weather code
 * @returns {string} - Mô tả
 */
function getWeatherDescription(code) {
    if (code === 0) return 'Trời quang';
    if (code === 1) return 'Chủ yếu quang';
    if (code === 2) return 'Có mây';
    if (code === 3) return 'Nhiều mây';
    if (code >= 45 && code <= 48) return 'Sương mù';
    if (code >= 51 && code <= 55) return 'Mưa phùn';
    if (code >= 61 && code <= 65) return 'Mưa';
    if (code >= 71 && code <= 77) return 'Tuyết rơi';
    if (code >= 80 && code <= 82) return 'Mưa rào';
    if (code === 95) return 'Giông bão';
    if (code >= 96 && code <= 99) return 'Giông kèm mưa đá';
    
    return 'Không xác định';
}

/**
 * Hàm chính: Lấy thời tiết của thành phố
 * 
 * Quy trình:
 * 1. Geocoding API: Chuyển tên thành phố → tọa độ (lat, lon)
 * 2. Weather API: Dùng tọa độ → lấy thời tiết
 * 
 * @param {string} city - Tên thành phố
 */
async function getWeather(city) {
    // Bước 0: Hiện loading
    showLoading();
    
    try {
        // ====== BƯỚC 1: Geocoding - Tìm tọa độ thành phố ======
        // API miễn phí của Open-Meteo
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=vi`;
        
        // fetch() trả về Promise → cần await
        const geocodeResponse = await fetch(geocodeUrl);
        
        // Kiểm tra response có OK không (status 200-299)
        if (!geocodeResponse.ok) {
            throw new Error('Lỗi kết nối đến server');
        }
        
        // response.json() CŨNG trả về Promise → cần await
        const geocodeData = await geocodeResponse.json();
        
        // Kiểm tra có tìm thấy thành phố không
        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error(`Không tìm thấy thành phố "${city}"`);
        }
        
        // Lấy tọa độ
        const location = geocodeData.results[0];
        const latitude = location.latitude;
        const longitude = location.longitude;
        const foundCity = location.name;
        const country = location.country || '';
        
        // ====== BƯỚC 2: Weather API - Lấy thời tiết ======
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
        
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            throw new Error('Lỗi lấy dữ liệu thời tiết');
        }
        
        const weatherData = await weatherResponse.json();
        
        // Lấy dữ liệu current weather
        const current = weatherData.current;
        
        // Tạo object dữ liệu để hiển thị
        const displayData = {
            cityName: `${foundCity}, ${country}`,
            date: new Date().toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            icon: getWeatherIcon(current.weather_code),
            temperature: Math.round(current.temperature_2m),
            description: getWeatherDescription(current.weather_code),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            feelsLike: Math.round(current.apparent_temperature)
        };
        
        // Bước 3: Hiển thị kết quả
        showWeather(displayData);
        
        // Bước 4: Lưu vào lịch sử
        saveToHistory(city);
        
    } catch (error) {
        // Bắt TẤT CẢ lỗi: network error, parse error, throw thủ công
        console.error('Lỗi:', error);
        showError(error.message);
    }
}


// ============================================
// PHẦN 4: LOCALSTORAGE - LƯU LỊCH SỬ
// ============================================

// Key để lưu trong LocalStorage
const HISTORY_KEY = 'weather_search_history';

/**
 * Lấy lịch sử từ LocalStorage
 * @returns {Array} - Mảng các thành phố đã tìm
 */
function getHistory() {
    // localStorage.getItem trả về string hoặc null
    const data = localStorage.getItem(HISTORY_KEY);
    
    // Nếu chưa có dữ liệu → trả về mảng rỗng
    if (!data) {
        return [];
    }
    
    // Parse JSON string thành Array
    return JSON.parse(data);
}

/**
 * Lưu thành phố vào lịch sử
 * - Giới hạn 5 thành phố gần nhất
 * - Không lưu trùng
 * 
 * @param {string} city - Tên thành phố
 */
function saveToHistory(city) {
    // Chuẩn hóa tên (viết hoa chữ đầu)
    const normalizedCity = city.trim().charAt(0).toUpperCase() + city.trim().slice(1).toLowerCase();
    
    // Lấy lịch sử hiện tại
    let history = getHistory();
    
    // Xóa nếu đã tồn tại (để đưa lên đầu)
    history = history.filter(item => item.toLowerCase() !== normalizedCity.toLowerCase());
    
    // Thêm vào đầu mảng
    history.unshift(normalizedCity);
    
    // Giới hạn chỉ giữ 5 thành phố
    if (history.length > 5) {
        history = history.slice(0, 5);
    }
    
    // Lưu lại vào LocalStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    
    // Cập nhật hiển thị
    renderHistory();
}

/**
 * Hiển thị danh sách lịch sử
 */
function renderHistory() {
    const history = getHistory();
    
    // Xóa nội dung cũ
    historyList.innerHTML = '';
    
    // Nếu không có lịch sử
    if (history.length === 0) {
        historyList.innerHTML = '<p class="no-history">Chưa có lịch sử tìm kiếm</p>';
        return;
    }
    
    // Tạo button cho mỗi thành phố
    history.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        
        // Click vào button → tìm lại thành phố đó
        button.addEventListener('click', () => {
            cityInput.value = city;
            getWeather(city);
        });
        
        historyList.appendChild(button);
    });
}


// ============================================
// PHẦN 5: XỬ LÝ SỰ KIỆN (EVENT HANDLERS)
// ============================================

/**
 * Hàm xử lý khi nhấn nút Tìm
 */
function handleSearch() {
    // Lấy giá trị từ input
    const city = cityInput.value.trim();
    
    // Kiểm tra input rỗng
    if (city === '') {
        showError('Vui lòng nhập tên thành phố');
        return;
    }
    
    // Gọi API lấy thời tiết
    getWeather(city);
}

// Gắn sự kiện click cho nút tìm kiếm
searchBtn.addEventListener('click', handleSearch);

// Gắn sự kiện nhấn Enter trong ô input
cityInput.addEventListener('keypress', (event) => {
    // event.key === 'Enter' khi nhấn phím Enter
    if (event.key === 'Enter') {
        handleSearch();
    }
});


// ============================================
// PHẦN 6: KHỞI CHẠY KHI TRANG LOAD
// ============================================

/**
 * Hàm khởi tạo khi trang load xong
 */
function init() {
    // Hiển thị lịch sử (nếu có)
    renderHistory();
    
    // Focus vào ô input
    cityInput.focus();
    
    console.log('🌤️ Weather App đã sẵn sàng!');
}

// Chạy init khi trang load xong
// DOMContentLoaded: Sự kiện khi HTML đã parse xong
document.addEventListener('DOMContentLoaded', init);