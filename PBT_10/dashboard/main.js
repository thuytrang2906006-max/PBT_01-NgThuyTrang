const APIS = {
    weather: {
        url: 'https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto',
        name: 'Weather'
    },
    users: {
        url: 'https://randomuser.me/api/?results=5',
        name: 'Random Users'
    },
    dogs: {
        url: 'https://dog.ceo/api/breeds/image/random/6',
        name: 'Dog Images'
    },
    posts: {
        url: 'https://jsonplaceholder.typicode.com/posts?_limit=5',
        name: 'Posts'
    }
};

const globalLoading = document.getElementById('globalLoading');
const dashboard = document.getElementById('dashboard');
const fetchTimeElement = document.getElementById('fetchTime');
const refreshBtn = document.getElementById('refreshBtn');

const widgets = {
    weather: {
        body: document.getElementById('weatherBody'),
        status: document.getElementById('weatherStatus')
    },
    users: {
        body: document.getElementById('usersBody'),
        status: document.getElementById('usersStatus')
    },
    dogs: {
        body: document.getElementById('dogsBody'),
        status: document.getElementById('dogsStatus')
    },
    posts: {
        body: document.getElementById('postsBody'),
        status: document.getElementById('postsStatus')
    }
};

function setWidgetStatus(widgetName, state) {
    const widget = widgets[widgetName];
    widget.status.className = 'widget-status ' + state;
}

function showWidgetLoading(widgetName) {
    const widget = widgets[widgetName];
    widget.body.innerHTML = `
        <div class="widget-loading">
            <div class="spinner-small"></div>
        </div>
    `;
    setWidgetStatus(widgetName, 'loading');
}

function showWidgetError(widgetName, message) {
    const widget = widgets[widgetName];
    widget.body.innerHTML = `
        <div class="widget-error">
            <span class="error-icon">❌</span>
            <p>${message}</p>
        </div>
    `;
    setWidgetStatus(widgetName, 'error');
}

function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 82) return '🌧️';
    if (code >= 95) return '⛈️';
    return '🌈';
}

function renderWeatherWidget(data) {
    const current = data.current;
    const icon = getWeatherIcon(current.weather_code);
    
    widgets.weather.body.innerHTML = `
        <div class="weather-content">
            <div class="weather-icon">${icon}</div>
            <div class="weather-temp">${Math.round(current.temperature_2m)}°C</div>
            <div class="weather-desc">Hà Nội, Việt Nam</div>
            <div class="weather-details">
                <div class="weather-detail">
                    <span class="label">💧 Độ ẩm</span>
                    <span class="value">${current.relative_humidity_2m}%</span>
                </div>
                <div class="weather-detail">
                    <span class="label">💨 Gió</span>
                    <span class="value">${Math.round(current.wind_speed_10m)} km/h</span>
                </div>
            </div>
        </div>
    `;
    setWidgetStatus('weather', 'success');
}

function renderUsersWidget(data) {
    const users = data.results;
    let html = '<div class="users-list">';
    
    users.forEach(user => {
        html += `
            <div class="user-item">
                <img class="user-avatar" src="${user.picture.thumbnail}" alt="${user.name.first}">
                <div class="user-info">
                    <div class="user-name">${user.name.first} ${user.name.last}</div>
                    <div class="user-email">${user.email}</div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    widgets.users.body.innerHTML = html;
    setWidgetStatus('users', 'success');
}

function renderDogsWidget(data) {
    const images = data.message;
    let html = '<div class="dogs-grid">';
    
    images.forEach(imageUrl => {
        html += `<img class="dog-image" src="${imageUrl}" alt="Cute dog">`;
    });
    
    html += '</div>';
    widgets.dogs.body.innerHTML = html;
    setWidgetStatus('dogs', 'success');
}

function renderPostsWidget(posts) {
    let html = '<div class="posts-list">';
    
    posts.forEach(post => {
        html += `
            <div class="post-item">
                <div class="post-title">${post.title}</div>
                <div class="post-body">${post.body}</div>
            </div>
        `;
    });
    
    html += '</div>';
    widgets.posts.body.innerHTML = html;
    setWidgetStatus('posts', 'success');
}

async function loadDashboard() {
    const startTime = Date.now();
    
    globalLoading.classList.remove('hidden');
    dashboard.classList.add('hidden');
    
    Object.keys(widgets).forEach(widgetName => {
        showWidgetLoading(widgetName);
    });
    
    try {
        const results = await Promise.allSettled([
            fetch(APIS.weather.url).then(res => res.json()),
            fetch(APIS.users.url).then(res => res.json()),
            fetch(APIS.dogs.url).then(res => res.json()),
            fetch(APIS.posts.url).then(res => res.json())
        ]);
        
        const fetchDuration = Date.now() - startTime;
        
        globalLoading.classList.add('hidden');
        dashboard.classList.remove('hidden');
        fetchTimeElement.textContent = `⏱️ Loaded in ${fetchDuration}ms`;
        
        const widgetNames = ['weather', 'users', 'dogs', 'posts'];
        
        results.forEach((result, index) => {
            const widgetName = widgetNames[index];
            
            if (result.status === 'fulfilled') {
                const data = result.value;
                switch (widgetName) {
                    case 'weather':
                        renderWeatherWidget(data);
                        break;
                    case 'users':
                        renderUsersWidget(data);
                        break;
                    case 'dogs':
                        renderDogsWidget(data);
                        break;
                    case 'posts':
                        renderPostsWidget(data);
                        break;
                }
            } else {
                showWidgetError(widgetName, 'Không thể tải dữ liệu');
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        globalLoading.classList.add('hidden');
        dashboard.classList.remove('hidden');
        Object.keys(widgets).forEach(widgetName => {
            showWidgetError(widgetName, 'Có lỗi xảy ra');
        });
    }
}

refreshBtn.addEventListener('click', loadDashboard);

function init() {
    loadDashboard();
}

document.addEventListener('DOMContentLoaded', init);