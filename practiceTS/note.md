# So sánh Class và Interface trong TypeScript

## 1. Sự khác biệt giữa Class và Interface

- **Class** có thể khởi tạo đối tượng, còn **Interface** thì không.
- **Class** có thể chứa các phương thức đã được định nghĩa sẵn, **Interface** chỉ định nghĩa kiểu dữ liệu, không có triển khai.
- **Class** hỗ trợ các phạm vi truy cập cho thuộc tính và phương thức (`public`, `private`, `protected`), **Interface** thì không.
- **Class** có thể kế thừa từ một lớp khác và triển khai nhiều interface, **Interface** chỉ có thể kế thừa từ nhiều interface khác.
- **Class** có thể có phương thức khởi tạo (`constructor`), **Interface** thì không.

## 2. Khi nào dùng Class, khi nào dùng Interface?

- **Dùng Class** khi cần tạo đối tượng, có các phương thức đã được định nghĩa sẵn, hoặc cần sử dụng các phạm vi truy cập khác nhau cho thuộc tính và phương thức.
- **Dùng Interface** khi chỉ cần định nghĩa cấu trúc của một đối tượng mà không cần triển khai các phương thức hoặc thuộc tính cụ thể.

## 3. Khi nào dùng Abstract Class, khi nào dùng Interface?

- **Dùng Abstract Class** khi muốn cung cấp một số triển khai mặc định cho các phương thức và có thể có các thuộc tính với các phạm vi truy cập khác nhau.
- **Dùng Interface** khi chỉ cần định nghĩa cấu trúc của một đối tượng mà không cần cung cấp bất kỳ triển khai nào.

---

## 4. Tổng kết

Cả **Class** và **Interface** đều có vai trò quan trọng trong TypeScript. Việc lựa chọn sử dụng cái nào phụ thuộc vào yêu cầu cụ thể của dự án và phong cách lập trình của bạn.
