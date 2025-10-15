# 🛍️ Dự Án Website Thương Mại Điện Tử - Shopee Clone

## 📋 Giới Thiệu Tổng Quan

Dự án phát triển một **nền tảng thương mại điện tử hoàn chỉnh** với đầy đủ tính năng, được thiết kế dựa trên mô hình của Shopee. Hệ thống được xây dựng với kiến trúc đa tầng, bảo mật cao và trải nghiệm người dùng tối ưu.

---

## 🎯 Phân Hệ Và Vai Trò Người Dùng

### 👥 **3 Vai Trò Chính Trong Hệ Thống**

| Vai Trò | Quyền Hạn & Chức Năng |
|---------|----------------------|
| **👑 Admin** | Quản lý toàn bộ hệ thống, giám sát hoạt động, xử lý sự cố |
| **🏪 Seller** | Quản lý cửa hàng, sản phẩm, đơn hàng và tương tác với khách hàng |
| **🛒 Customer** | Mua sắm, quản lý đơn hàng và đánh giá sản phẩm |

---

## 🚀 Chi Tiết Chức Năng Theo Vai Trò

### 👑 **Quản Trị Viên (Admin)**

- ✅ **Quản lý người dùng**: Phê duyệt, khóa/mở tài khoản
- ✅ **Quản lý danh mục**: Thêm/sửa/xóa danh mục sản phẩm
- ✅ **Giám sát giao dịch**: Theo dõi toàn bộ đơn hàng, doanh thu
- ✅ **Báo cáo thống kê**: Dashboard với các chỉ số kinh doanh
- ✅ **Quản lý khuyến mãi**: Tạo và quản lý chương trình giảm giá toàn hệ thống
- ✅ **Xử lý khiếu nại**: Hỗ trợ giải quyết tranh chấp

### 🏪 **Người Bán Hàng (Seller)**

- ✅ **Quản lý sản phẩm**
  - Đăng tải sản phẩm mới
  - Chỉnh sửa thông tin sản phẩm
  - Quản lý tồn kho và giá cả
  - Ẩn/hiện sản phẩm

- ✅ **Quản lý đơn hàng**
  - Xác nhận đơn hàng
  - Cập nhật trạng thái vận chuyển
  - In hóa đơn, mã vận đơn

- ✅ **Thống kê bán hàng**
  - Doanh thu theo thời gian
  - Sản phẩm bán chạy
  - Đánh giá của khách hàng

- ✅ **Quản lý đánh giá**
  - Theo dõi rating và review
  - Phản hồi đánh giá của khách

### 🛒 **Khách Hàng (Customer)**

- ✅ **Trải nghiệm mua sắm**
  - Duyệt và tìm kiếm sản phẩm
  - Lọc theo danh mục, giá, đánh giá
  - Xem chi tiết sản phẩm với đầy đủ biến thể

- ✅ **Quản lý giỏ hàng**
  - Thêm/sửa/xóa sản phẩm
  - Lưu giỏ hàng giữa các phiên

- ✅ **Quy trình mua hàng**
  - Tạo đơn hàng
  - Chọn phương thức thanh toán
  - Theo dõi trạng thái đơn hàng

- ✅ **Tương tác sau mua**
  - Đánh giá và nhận xét sản phẩm
  - Theo dõi lịch sử mua hàng
  - Quản lý địa chỉ giao hàng

---

## 🔐 Hệ Thống Bảo Mật & Xác Thực

### 🔑 **Cơ Chế Token Thông Minh**

```javascript
// Access Token & Refresh Token với device management
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "device_id": "unique_device_identifier",
  "max_devices": 3,
  "expires_in": "15m"
}
```

### 📱 **Xác Thực 2 Yếu Tố (2FA)**

- ✅ **SMS OTP**: Gửi mã xác thực qua điện thoại
- ✅ **Email Verification**: Xác thực qua email
- ✅ **Authenticator App**: Tích hợp Google Authenticator
- ✅ **Backup Codes**: Mã dự phòng cho trường hợp khẩn cấp

### 🛡️ **Phân Quyền Chi Tiết**

```javascript
// Role-Based Access Control với Permission
const permissions = {
  admin: ['*'],
  seller: [
    'product:create',
    'product:update', 
    'order:view',
    'order:update'
  ],
  customer: [
    'product:view',
    'order:create',
    'review:create'
  ]
};
```

---

## 🎨 Quản Lý Sản Phẩm Đa Biến Thể

### 🏷️ **Hệ Thống Biến Thể Sản Phẩm (Product Variants)**

```javascript
{
  "product_id": "SP001",
  "name": "Áo Thun Basic",
  "variants": [
    {
      "sku": "SP001-RED-M",
      "color": "Đỏ",
      "size": "M",
      "price": 199000,
      "stock": 50,
      "image": "ao-red.jpg"
    },
    {
      "sku": "SP001-BLUE-L", 
      "color": "Xanh",
      "size": "L",
      "price": 219000,
      "stock": 30,
      "image": "ao-blue.jpg"
    }
  ]
}
```

---

## 💳 Hệ Thống Thanh Toán

### 📱 **Thanh Toán QR Code**

```javascript
{
  "payment_method": "QR_CODE",
  "provider": "MOMO|VNPAY|ZALOPAY",
  "amount": 500000,
  "order_id": "DH202412345",
  "qr_data": "base64_encoded_qr_image",
  "expires_at": "2024-01-20T15:30:00Z"
}
```

**Tích hợp ví điện tử phổ biến:**

- 🟡 Momo
- 🔵 VNPay
- 🔴 ZaloPay
- 🟢 ViettelPay

---

## 📧 Hệ Thống Thông Báo & Marketing

### ⏰ **Cron Job & Email Automation**

```javascript
// Cấu hình cron job tự động
{
  "new_product_notification": "0 9 * * *", // 9h sáng hàng ngày
  "abandoned_cart_reminder": "0 18 * * *", // 6h chiều hàng ngày
  "weekly_digest": "0 8 * * 1", // 8h sáng thứ 2
  "birthday_greeting": "0 6 * * *" // 6h sáng hàng ngày
}
```

### 📬 **Các Loại Email Tự Động**

- 🎉 **Thông báo sản phẩm mới** - Gửi định kỳ hàng tuần
- 🛒 **Nhắc nhở giỏ hàng** - Khách hàng chưa hoàn tất mua hàng
- 📊 **Báo cáo tuần** - Tổng hợp hoạt động cho seller
- 🎂 **Chúc mừng sinh nhật** - Kèm voucher giảm giá
- 🔔 **Thông báo khuyến mãi** - Flash sale, sự kiện đặc biệt

---
<https://dbdiagram.io/d/Ecom-NestJS-68eca61f2e68d21b411f85e8>

## 🗃️ Thiết Kế Cơ Sở Dữ Liệu

### 👤 **Quản Lý Người Dùng & Bảo Mật**

```sql
-- Bảng ngôn ngữ hỗ trợ đa ngôn ngữ
Table Language {
    id            int    [pk, increment]
    code          varchar(10) [not null, unique]
    name          varchar(50)  [not null]
}

-- Bảng người dùng chính
Table User {
    id            int    [pk, increment]
    email         varchar(255) [not null, unique]
    password_hash varchar(255) [not null]
    phone         varchar(20)
    avatar        varchar(500)
    role          enum('admin','seller','customer')
    is_active     boolean [default: false]
    created_at    timestamp
}

-- Bảng dịch thông tin người dùng
Table UserTranslation {
    id            int    [pk, increment]
    user_id       int    [ref: > User.id]
    language_id   int    [ref: > Language.id]
    full_name     varchar(255)
    address       text
    description   text
    
    indexes {
        (user_id, language_id) [unique]
    }
}

-- Bảng refresh token với quản lý thiết bị
Table RefreshToken {
    token         varchar(500) [pk]
    user_id       int    [ref: > User.id]
    device_id     varchar(100)
    device_info   varchar(255)
    expires_at    timestamp
    created_at    timestamp
}

-- Bảng mã xác thực OTP
Table VerificationCode {
    id            int    [pk, increment]
    email         varchar(255) [not null]
    code          varchar(6)   [not null]
    type          enum('register','forgot_password','2fa')
    expires_at    timestamp    [not null]
    is_used       boolean      [default: false]
    created_at    timestamp
}
```

### 🛡️ **Hệ Thống Phân Quyền**

```sql
-- Bảng vai trò
Table Role {
    id            int    [pk, increment]
    name          varchar(50) [not null, unique]
    description   text
    is_active     boolean [default: true]
}

-- Bảng quyền chi tiết
Table Permission {
    id            int    [pk, increment]
    name          varchar(100) [not null]
    resource      varchar(50)  [not null]  -- product, order, user
    action        varchar(50)  [not null]  -- create, read, update, delete
    description   text
}

-- Bảng liên kết role-permission
Table RolePermission {
    role_id       int [ref: > Role.id]
    permission_id int [ref: > Permission.id]
    
    indexes {
        (role_id, permission_id) [pk]
    }
}

-- Bảng liên kết user-role
Table UserRole {
    user_id       int [ref: > User.id]
    role_id       int [ref: > Role.id]
    created_at    timestamp
    
    indexes {
        (user_id, role_id) [pk]
    }
}
```

### 🏪 **Quản Lý Sản Phẩm & Danh Mục**

```sql
-- Bảng danh mục với cấu trúc cây
Table Category {
    id               int    [pk, increment]
    parent_id        int    [ref: > Category.id, null]  -- Tự quan hệ
    image            varchar(500)
    sort_order       int    [default: 0]
    is_active        boolean [default: true]
    created_at       timestamp
}

-- Bảng dịch danh mục
Table CategoryTranslation {
    id               int    [pk, increment]
    category_id      int    [ref: > Category.id]
    language_id      int    [ref: > Language.id]
    name             varchar(255) [not null]
    description      text
    slug             varchar(255) [not null]
    
    indexes {
        (category_id, language_id) [unique]
    }
}

-- Bảng thương hiệu
Table Brand {
    id               int    [pk, increment]
    logo             varchar(500)
    is_active        boolean [default: true]
    created_at       timestamp
}

-- Bảng dịch thương hiệu
Table BrandTranslation {
    id               int    [pk, increment]
    brand_id         int    [ref: > Brand.id]
    language_id      int    [ref: > Language.id]
    name             varchar(255) [not null]
    description      text
    
    indexes {
        (brand_id, language_id) [unique]
    }
}

-- Bảng sản phẩm chính
Table Product {
    id               int    [pk, increment]
    brand_id         int    [ref: > Brand.id, null]
    base_price       decimal(12,2) [not null]
    virtual_price    decimal(12,2)  -- Giá ảo để so sánh
    weight           decimal(8,2)   -- Trọng lượng (gram)
    is_active        boolean [default: true]
    created_by       int    [ref: > User.id]
    created_at       timestamp
    updated_at       timestamp
}

-- Bảng liên kết sản phẩm - danh mục
Table ProductCategory {
    product_id       int [ref: > Product.id]
    category_id      int [ref: > Category.id]
    
    indexes {
        (product_id, category_id) [pk]
    }
}

-- Bảng dịch sản phẩm
Table ProductTranslation {
    id               int    [pk, increment]
    product_id       int    [ref: > Product.id]
    language_id      int    [ref: > Language.id]
    name             varchar(255) [not null]
    description      text
    short_description text
    slug             varchar(255) [not null]
    meta_title       varchar(255)
    meta_description text
    
    indexes {
        (product_id, language_id) [unique]
    }
}
```

### 🎨 **Hệ Thống Biến Thể Sản Phẩm (Product Variants)**

```sql
-- Bảng biến thể (Màu sắc, Size, ...)
Table Variant {
    id               int    [pk, increment]
    name             varchar(100) [not null]  -- Màu sắc, Size, Chất liệu
    product_id       int    [ref: > Product.id]
    sort_order       int    [default: 0]
}

-- Bảng giá trị biến thể (Đỏ, Xanh, S, M, L...)
Table VariantOption {
    id               int    [pk, increment]
    variant_id       int    [ref: > Variant.id]
    value            varchar(100) [not null]  -- Đỏ, Cam, Vàng, ...
    hex_color        varchar(7)   -- Mã màu HEX (cho biến thể màu)
    image            varchar(500) -- Ảnh đại diện (nếu có)
}

-- Bảng SKU (Stock Keeping Unit)
Table SKU {
    id               int    [pk, increment]
    product_id       int    [ref: > Product.id]
    sku_code         varchar(100) [not null, unique]  -- Mã SKU tự sinh
    price            decimal(12,2) [not null]
    compare_price    decimal(12,2)  -- Giá so sánh
    cost_price       decimal(12,2)  -- Giá vốn
    stock_quantity   int    [default: 0]
    reserved_quantity int   [default: 0]  -- Số lượng đang trong giỏ hàng
    weight           decimal(8,2)
    images           text   -- JSON array của các ảnh
    is_active        boolean [default: true]
    created_at       timestamp
}

-- Bảng liên kết SKU - VariantOption (n-n)
Table SKUVariantOption {
    sku_id           int [ref: > SKU.id]
    variant_option_id int [ref: > VariantOption.id]
    
    indexes {
        (sku_id, variant_option_id) [pk]
    }
}
```

### 🛒 **Hệ Thống Mua Hàng & Giỏ Hàng**

```sql
-- Bảng giỏ hàng
Table Cart {
    id               int    [pk, increment]
    user_id          int    [ref: > User.id, null]  -- null cho guest
    session_id       varchar(100)  -- Cho khách vãng lai
    created_at       timestamp
    updated_at       timestamp
}

-- Bảng item trong giỏ hàng
Table CartItem {
    id               int    [pk, increment]
    cart_id          int    [ref: > Cart.id]
    sku_id           int    [ref: > SKU.id]
    quantity         int    [not null]
    added_at         timestamp
    
    indexes {
        (cart_id, sku_id) [unique]
    }
}

-- Bảng đơn hàng
Table Order {
    id               int    [pk, increment]
    order_code       varchar(20) [not null, unique]  -- Mã đơn hàng
    user_id          int    [ref: > User.id]
    status           enum('pending','confirmed','processing','shipped','delivered','cancelled','refunded')
    subtotal         decimal(12,2) [not null]
    shipping_fee     decimal(12,2) [default: 0]
    tax_amount       decimal(12,2) [default: 0]
    discount_amount  decimal(12,2) [default: 0]
    total_amount     decimal(12,2) [not null]
    payment_method   enum('cod','momo','vnpay','zalopay')
    payment_status   enum('pending','paid','failed','refunded')
    shipping_address text   [not null]
    customer_note    text
    cancelled_reason text
    created_at       timestamp
    updated_at       timestamp
}

-- Bảng snapshot sản phẩm khi mua hàng
Table OrderItem {
    id               int    [pk, increment]
    order_id         int    [ref: > Order.id]
    sku_id           int    [ref: > SKU.id, null]  -- Có thể null nếu SKU bị xóa
    product_name     varchar(255) [not null]
    sku_attributes   text   -- JSON của các thuộc tính biến thể
    unit_price       decimal(12,2) [not null]
    quantity         int    [not null]
    total_price      decimal(12,2) [not null]
    product_image    varchar(500)
}

-- Bảng lịch sử trạng thái đơn hàng
Table OrderStatusHistory {
    id               int    [pk, increment]
    order_id         int    [ref: > Order.id]
    status           enum('pending','confirmed','processing','shipped','delivered','cancelled','refunded')
    note             text
    created_by       int    [ref: > User.id, null]  -- null cho system
    created_at       timestamp
}
```

### ⭐ **Đánh Giá & Tương Tác**

```sql
-- Bảng đánh giá sản phẩm
Table Review {
    id               int    [pk, increment]
    user_id          int    [ref: > User.id]
    product_id       int    [ref: > Product.id]
    order_item_id    int    [ref: > OrderItem.id]  -- Đảm bảo review từ khách đã mua
    rating           int    [not null]  -- 1-5 sao
    title            varchar(255)
    content          text
    images           text   -- JSON array của ảnh review
    is_approved      boolean [default: false]
    helpful_count    int    [default: 0]
    created_at       timestamp
    updated_at       timestamp
    
    indexes {
        (user_id, product_id, order_item_id) [unique]
    }
}

-- Bảng phản hồi review từ seller
Table ReviewReply {
    id               int    [pk, increment]
    review_id        int    [ref: > Review.id]
    user_id          int    [ref: > User.id]  -- Seller hoặc admin
    content          text   [not null]
    created_at       timestamp
}

-- Bảng đánh dấu review hữu ích
Table ReviewHelpful {
    user_id          int [ref: > User.id]
    review_id        int [ref: > Review.id]
    created_at       timestamp
    
    indexes {
        (user_id, review_id) [pk]
    }
}
```

### 💳 **Hệ Thống Thanh Toán**

```sql
-- Bảng giao dịch thanh toán
Table PaymentTransaction {
    id               int    [pk, increment]
    order_id         int    [ref: > Order.id]
    gateway          enum('momo','vnpay','zalopay')
    transaction_id   varchar(100)  -- ID từ gateway
    amount           decimal(12,2) [not null]
    currency         varchar(3) [default: 'VND']
    status           enum('pending','success','failed','cancelled')
    payment_method   varchar(50)
    bank_code        varchar(20)
    card_type        varchar(50)
    pay_date         timestamp
    gateway_response text   -- Full response từ gateway (JSON)
    created_at       timestamp
}

-- Bảng mã QR thanh toán
Table PaymentQRCode {
    id               int    [pk, increment]
    transaction_id   int    [ref: > PaymentTransaction.id]
    qr_data          text   [not null]  -- Dữ liệu QR code
    qr_image_url     varchar(500)       -- URL ảnh QR code
    expires_at       timestamp [not null]
    created_at       timestamp
}
```

### 💬 **Hệ Thống Tin Nhắn & Hỗ Trợ**

```sql
-- Bảng tin nhắn
Table Message {
    id               int    [pk, increment]
    sender_id        int    [ref: > User.id]
    receiver_id      int    [ref: > User.id]
    content          text   [not null]
    message_type     enum('text','image','file','system')
    file_url         varchar(500)
    is_read          boolean [default: false]
    read_at          timestamp
    created_at       timestamp
}

-- Bảng phòng chat (cho support)
Table ChatRoom {
    id               int    [pk, increment]
    user_id          int    [ref: > User.id]
    support_id       int    [ref: > User.id, null]  -- Nhân viên support
    status           enum('open','resolved','closed')
    title            varchar(255)
    last_message_at  timestamp
    created_at       timestamp
}
```

---

## 🛠️ Công Nghệ Sử Dụng

### 🎯 **Tech Stack Đề Xuất**

- **Frontend**: React.js/Vue.js với TypeScript
- **Backend**: Node.js (Express) hoặc Python (Django)
- **Database**: PostgreSQL + Redis (cache)
- **Authentication**: JWT + OAuth2
- **Payment**: Integration với cổng thanh toán Việt Nam
- **Email**: Nodemailer với template engine
- **Storage**: AWS S3 hoặc Cloudinary cho ảnh
- **Deployment**: Docker + AWS/Google Cloud

---

## 📈 Tính Năng Tương Lai

### 🚀 **Roadmap Phát Triển**

- [ ] **AI Recommendation**: Gợi ý sản phẩm thông minh
- [ ] **Live Chat**: Hỗ trợ trực tuyến real-time
- [ ] **Mobile App**: Ứng dụng di động iOS/Android
- [ ] **Loyalty Program**: Chương trình tích điểm
- [ ] **Multi-language**: Đa ngôn ngữ
- [ ] **Advanced Analytics**: Phân tích dữ liệu nâng cao

---
