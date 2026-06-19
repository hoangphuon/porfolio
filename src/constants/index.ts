export const personalInfo = {
  name: "HOÀNG XUÂN PHƯƠNG",
  tagline: "Kể chuyện qua từng dòng code • Sinh viên Công nghệ Thông tin • Người sáng tạo trải nghiệm số",
  about: "Tôi là Hoàng Xuân Phương, một sinh viên đam mê Công nghệ Thông tin tại Đại học Giao thông Vận tải. Tôi không chỉ viết code — tôi kể chuyện qua công nghệ. Với niềm tin rằng mỗi giao diện, mỗi tương tác đều có thể mang lại cảm xúc, tôi luôn tìm cách kết hợp giữa kỹ thuật chính xác và sự tinh tế trong thiết kế.",
  education: {
    school: "Đại học Giao thông Vận tải",
    major: "Công nghệ Thông tin",
    year: "2026 – Hiện tại",
    gpa: "3.6/4.0",
    description: "Đây là nơi tôi được trang bị nền tảng vững chắc về lập trình, cơ sở dữ liệu, mạng máy tính, trí tuệ nhân tạo và phát triển ứng dụng web."
  },
  contact: {
    phone: "0338 223 750",
    email: "hp860065@gmail.com",
    github: "https://github.com/hoangphuon",
    twitter: "https://x.com/Phuonguniq68455"
  }
};

export const skills = [
  { 
    name: "Frontend", 
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 80 },
      { name: "TailwindCSS", level: 90 }
    ] 
  },
  { 
    name: "Backend", 
    items: [
      { name: "Node.js", level: 75 },
      { name: "PHP", level: 70 },
      { name: "Python", level: 80 }
    ] 
  },
  { 
    name: "Database", 
    items: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 70 },
      { name: "Firebase", level: 75 }
    ] 
  },
  { 
    name: "Design", 
    items: [
      { name: "Figma", level: 85 },
      { name: "UI/UX Design", level: 80 }
    ] 
  },
  { 
    name: "Tools", 
    items: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Docker", level: 65 }
    ] 
  }
];

export const projects = [
  {
    title: "Cinematic Portfolio 3D",
    description: "Một trang web giới thiệu bản thân đột phá với không gian 3D, camera cinematic điều khiển qua scroll và robot AI tương tác.",
    research: "Dự án này là một nghiên cứu sâu về việc kết hợp giữa nghệ thuật thị giác và kỹ thuật lập trình web hiện đại. \n\n1. Tối ưu hóa hiệu suất: Sử dụng React Three Fiber để quản lý scene graph, áp dụng kỹ thuật 'Frustum Culling' và 'RequestAnimationFrame' để duy trì 60 FPS ổn định ngay cả khi xử lý hàng ngàn hạt particles.\n2. Trải nghiệm người dùng: Hệ thống camera được tính toán dựa trên thuật toán nội suy (LERP) để tạo ra chuyển động mượt mà khi người dùng cuộn chuột. Robot AI được xây dựng hoàn toàn bằng Procedural Geometry để giảm thiểu dung lượng tải trang.\n3. Thiết kế: Áp dụng nguyên lý Glassmorphism và Neon Lighting để tạo chiều sâu và cảm giác tương lai.",
    tags: ["React", "Three.js", "GSAP", "TailwindCSS"],
    category: "Web 3D",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    source_code_link: "https://github.com/hoangphuon/cinematic-portfolio",
  },
  {
    title: "TransportHub Management",
    description: "Hệ thống quản lý vận tải thông minh cho phép đặt vé, theo dõi lộ trình thời gian thực và quản lý đội xe.",
    research: "Nghiên cứu tập trung vào việc giải quyết bài toán điều phối vận tải trong thời gian thực.\n\n1. Kiến trúc hệ thống: Xây dựng dựa trên Node.js và MongoDB, sử dụng kiến trúc Event-Driven để xử lý đồng bộ dữ liệu giữa tài xế và hành khách.\n2. Thuật toán tối ưu: Áp dụng thuật toán Dijkstra cải tiến để tìm đường ngắn nhất và cân bằng tải lượng xe trên các tuyến đường trọng điểm.\n3. Thời gian thực: Tích hợp WebSockets (Socket.io) để truyền tải tọa độ GPS với độ trễ cực thấp. Hệ thống Dashboard sử dụng Recharts để phân tích mật độ đơn hàng theo từng khung giờ.",
    tags: ["React.js", "Node.js", "MongoDB", "Socket.io"],
    category: "Fullstack",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    source_code_link: "https://github.com/hoangphuon/transporthub",
  },
  {
    title: "TrafficVision AI",
    description: "Ứng dụng trí tuệ nhân tạo để nhận diện mật độ giao thông qua camera, dự đoán ùn tắc.",
    research: "Đây là dự án nghiên cứu về ứng dụng Computer Vision trong giao thông đô thị.\n\n1. Nhận diện đối tượng: Huấn luyện mô hình YOLOv8 trên tập dữ liệu giao thông Việt Nam để nhận diện chính xác xe máy, ô tô và xe buýt. \n2. Xử lý ảnh: Sử dụng OpenCV để tiền xử lý luồng video, loại bỏ nhiễu và tăng cường độ tương phản trong điều kiện thiếu sáng.\n3. Dự báo ùn tắc: Kết hợp dữ liệu nhận diện được với mô hình mạng nơ-ron hồi quy (LSTM) để đưa ra cảnh báo ùn tắc trước 15-30 phút với độ chính xác đạt trên 85%.",
    tags: ["Python", "TensorFlow", "OpenCV", "Flask"],
    category: "AI / Data",
    image: "https://images.unsplash.com/photo-1545156521-77bd85671d30?q=80&w=2080&auto=format&fit=crop",
    source_code_link: "https://github.com/hoangphuon/traffic-vision",
  },
  {
    title: "StudentLife Ecosystem",
    description: "Hệ sinh thái dành cho sinh viên UTC gồm: quản lý lịch học, diễn đàn trao đổi tài liệu.",
    research: "Nghiên cứu về việc xây dựng một cộng đồng số thu nhỏ cho sinh viên.\n\n1. Bảo mật và phân quyền: Sử dụng Firebase Authentication kết hợp với Firestore Rules để đảm bảo dữ liệu cá nhân và tài liệu nội bộ được bảo vệ an toàn.\n2. Tối ưu hóa lưu trữ: Xây dựng hệ thống phân cấp thư mục tài liệu thông minh, cho phép tìm kiếm nhanh dựa trên nội dung (Full-text search).\n3. Tương tác: Tích hợp hệ thống bình luận thời gian thực và đánh giá tài liệu chất lượng giúp sinh viên dễ dàng chọn lọc nguồn học liệu.",
    tags: ["Next.js", "Firebase", "TailwindCSS", "Framer Motion"],
    category: "Web App",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    source_code_link: "https://github.com/hoangphuon/student-life",
  },
  {
    title: "Personal Blog - Frame by Frame",
    description: "Nền tảng blog cá nhân tối giản, tập trung vào trải nghiệm đọc và hình ảnh chất lượng cao.",
    research: "Nghiên cứu về hiệu suất và khả năng mở rộng của nội dung tĩnh (Static Site Generation).\n\n1. Tốc độ tải trang: Áp dụng Next.js Image Optimization và font self-hosting để đạt chỉ số Core Web Vitals tuyệt đối.\n2. Quản lý nội dung: Sử dụng Contentlayer để chuyển đổi các tệp Markdown thành dữ liệu kiểu Type-safe, giúp quy trình viết bài trở nên chuyên nghiệp và nhất quán.\n3. SEO: Xây dựng hệ thống tự động tạo Sitemap và các thẻ Meta động giúp tăng khả năng hiển thị trên các công cụ tìm kiếm.",
    tags: ["Next.js", "Contentlayer", "TailwindCSS"],
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    source_code_link: "https://github.com/hoangphuon/my-blog",
  },
  {
    title: "Smart Logistic Tracker",
    description: "Giải pháp theo dõi kiện hàng xuyên quốc gia sử dụng công nghệ GPS và tích hợp API bản đồ thông minh.",
    research: "Nghiên cứu giải pháp theo dõi hậu cần trong chuỗi cung ứng toàn cầu.\n\n1. Tích hợp API: Kết nối với nhiều nhà cung cấp dịch vụ vận chuyển thông qua một cổng trung gian duy nhất.\n2. Trải nghiệm di động: Sử dụng React Native để xây dựng ứng dụng mượt mà trên cả iOS và Android. Áp dụng kỹ thuật Redux Persist để duy trì trạng thái ứng dụng khi mất kết nối mạng.\n3. Bản đồ: Tối ưu hóa việc hiển thị hàng ngàn điểm mốc trên Google Maps mà không gây giật lag (Marker Clustering).",
    tags: ["React Native", "Google Maps API", "Node.js"],
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    source_code_link: "https://github.com/hoangphuon/logistic-tracker",
  }
];
