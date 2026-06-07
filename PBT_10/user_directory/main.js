const api = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) {
            throw new Error('Không thể tải danh sách users');
        }
        return await response.json();
    },
    
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) {
            throw new Error('Không tìm thấy user');
        }
        return await response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Không thể tạo user');
        }
        return await response.json();
    },
    
    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Không thể cập nhật user');
        }
        return await response.json();
    },
    
    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Không thể xóa user');
        }
        return true;
    }
};

const ui = {
    loadingDiv: document.getElementById('loading'),
    errorDiv: document.getElementById('error'),
    errorMessage: document.getElementById('errorMessage'),
    userList: document.getElementById('userList'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    
    showLoading() {
        this.loadingDiv.classList.remove('hidden');
        this.errorDiv.classList.add('hidden');
        this.userList.classList.add('hidden');
    },
    
    hideLoading() {
        this.loadingDiv.classList.add('hidden');
    },
    
    showError(message) {
        this.hideLoading();
        this.errorMessage.textContent = message;
        this.errorDiv.classList.remove('hidden');
        this.userList.classList.add('hidden');
    },
    
    showToast(message, type = 'success') {
        this.toastMessage.textContent = message;
        this.toast.className = 'toast ' + type;
        setTimeout(() => {
            this.toast.classList.add('hidden');
        }, 3000);
    },
    
    renderUsers(users) {
        this.hideLoading();
        this.errorDiv.classList.add('hidden');
        this.userList.innerHTML = '';
        
        if (users.length === 0) {
            this.userList.innerHTML = '<p style="text-align: center; color: white;">Không có user nào</p>';
            this.userList.classList.remove('hidden');
            return;
        }
        
        users.forEach(user => {
            const card = this.createUserCard(user);
            this.userList.appendChild(card);
        });
        
        this.userList.classList.remove('hidden');
    },
    
    createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.dataset.id = user.id;
        
        const initials = user.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
        
        const companyName = typeof user.company === 'object' 
            ? user.company.name 
            : user.company || '';
        
        card.innerHTML = `
            <div class="user-avatar">${initials}</div>
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-email">📧 ${user.email}</div>
                ${user.phone ? `<div class="user-phone">📱 ${user.phone}</div>` : ''}
                ${companyName ? `<div class="user-company">🏢 ${companyName}</div>` : ''}
            </div>
            <div class="user-actions">
                <button class="btn btn-edit" onclick="editUser(${user.id})">✏️ Sửa</button>
                <button class="btn btn-delete" onclick="confirmDelete(${user.id}, '${user.name}')">🗑️ Xóa</button>
            </div>
        `;
        
        return card;
    }
};

let users = [];
let currentUserId = null;

async function loadUsers() {
    ui.showLoading();
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        users = await api.getUsers();
        ui.renderUsers(users);
    } catch (error) {
        console.error('Lỗi load users:', error);
        ui.showError(error.message);
    }
}

function searchUsers(keyword) {
    const searchTerm = keyword.toLowerCase().trim();
    if (searchTerm === '') {
        ui.renderUsers(users);
        return;
    }
    const filtered = users.filter(user => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
    });
    ui.renderUsers(filtered);
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const userPhoneInput = document.getElementById('userPhone');
const userCompanyInput = document.getElementById('userCompany');

function openAddModal() {
    modalTitle.textContent = 'Thêm User Mới';
    userForm.reset();
    userIdInput.value = '';
    modal.classList.remove('hidden');
}

async function editUser(id) {
    modalTitle.textContent = 'Sửa Thông Tin User';
    const user = users.find(u => u.id === id);
    if (!user) {
        ui.showToast('Không tìm thấy user', 'error');
        return;
    }
    userIdInput.value = user.id;
    userNameInput.value = user.name;
    userEmailInput.value = user.email;
    userPhoneInput.value = user.phone || '';
    userCompanyInput.value = typeof user.company === 'object' 
        ? user.company.name 
        : user.company || '';
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const userData = {
        name: userNameInput.value.trim(),
        email: userEmailInput.value.trim(),
        phone: userPhoneInput.value.trim(),
        company: userCompanyInput.value.trim()
    };
    
    if (!userData.name || !userData.email) {
        ui.showToast('Vui lòng nhập đầy đủ thông tin bắt buộc', 'error');
        return;
    }
    
    try {
        const id = userIdInput.value;
        
        if (id) {
            const updatedUser = await api.updateUser(id, userData);
            const index = users.findIndex(u => u.id === parseInt(id));
            if (index !== -1) {
                users[index] = { ...users[index], ...userData };
            }
            ui.showToast('Cập nhật user thành công!', 'success');
        } else {
            const newUser = await api.createUser(userData);
            const userWithId = {
                ...userData,
                id: newUser.id || Date.now()
            };
            users.unshift(userWithId);
            ui.showToast('Thêm user mới thành công!', 'success');
        }
        
        ui.renderUsers(users);
        closeModal();
    } catch (error) {
        console.error('Lỗi lưu user:', error);
        ui.showToast(error.message, 'error');
    }
}

const confirmDialog = document.getElementById('confirmDialog');
const confirmMessage = document.getElementById('confirmMessage');

function confirmDelete(id, name) {
    currentUserId = id;
    confirmMessage.textContent = `Bạn có chắc muốn xóa "${name}"?`;
    confirmDialog.classList.remove('hidden');
}

function closeConfirmDialog() {
    confirmDialog.classList.add('hidden');
    currentUserId = null;
}

async function handleDelete() {
    if (!currentUserId) return;
    
    try {
        await api.deleteUser(currentUserId);
        users = users.filter(u => u.id !== currentUserId);
        ui.renderUsers(users);
        closeConfirmDialog();
        ui.showToast('Đã xóa user thành công!', 'success');
    } catch (error) {
        console.error('Lỗi xóa user:', error);
        ui.showToast(error.message, 'error');
    }
}

document.getElementById('addUserBtn').addEventListener('click', openAddModal);
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('cancelBtn').addEventListener('click', closeModal);
userForm.addEventListener('submit', handleFormSubmit);
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchUsers(e.target.value);
});
document.getElementById('retryBtn').addEventListener('click', loadUsers);
document.getElementById('confirmCancelBtn').addEventListener('click', closeConfirmDialog);
document.getElementById('confirmDeleteBtn').addEventListener('click', handleDelete);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

confirmDialog.addEventListener('click', (e) => {
    if (e.target === confirmDialog) {
        closeConfirmDialog();
    }
});

function init() {
    loadUsers();
}

document.addEventListener('DOMContentLoaded', init);