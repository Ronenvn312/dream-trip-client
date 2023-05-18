const host = "https://dreamtrip-sx68.onrender.com"
// API cho tour
export const insertTour = `${host}/tour/insert`
export const getTour = `${host}/tour/get_tour`
export const deleteTour = `${host}/tour/delete`
export const updateTour = `${host}/tour/update`
export const findAllTour = `${host}/tour/findAlls`
export const searchsTour = `${host}/tour/searchs`
export const findByCateTour = `${host}/tour/findByCate`
export const findTrendingTour = `${host}/tour/findTrending`
export const findPopularTour = `${host}/tour/findPopular`
export const findFilterTour = `${host}/tour/findFilter`
export const likedTour = `${host}/tour/liked`
export const bookedTour = `${host}/tour/booked`
export const planedTour = `${host}/tour/planed`
//API cho hoạt động
export const insertHoatDong = `${host}/hoatdong/insert`
export const findHoatDongById = `${host}/hoatdong/find`
export const findAllsHDByTourId = `${host}/hoatdong/findbyTourId`
export const findAllHoatDong = `${host}/hoatdong/findalls`
export const updateHoatDong = `${host}/hoatdong/update`
export const deleteHoatDong = `${host}/hoatdong/delete`
export const rateHoatDong = `${host}/hoatdong/rate`
// API cho người dùng
export const registerNguoiDung = `${host}/admin/create`
export const findNguoiDungById = `${host}/admin/get`
export const findNguoiDungByEmail = `${host}/admin/findByEmail`
export const updateUser = `${host}/admin/update`
export const deleteUser = `${host}/admin/delete`
// API cho  tài khoản
export const registerTaiKhoan = `${host}/taikhoan/register`
export const findTaiKhoanByEmail = `${host}/taikhoan/loggin`
export const logginTaiKhoan = `${host}/taikhoan/logginUser`
export const updateTaiKhoan = `${host}/taikhoan/update`
export const updateMK = `${host}/taikhoan/updateMK`
export const deleteTK = `${host}/taikhoan/delete`
export const findAllTK = `${host}/taikhoan/findAll`
// API cho OTP
export const createOTP = `${host}/otp/create`
export const getOTP = `${host}/otp/get`
// API cho đánh giá tour
export const findDanhGiaById = `${host}/danhGia/getByUserId`
export const getDanhGiaForUser = `${host}/danhGia/getForUser`
export const deleteDanhGia = `${host}/danhGia/delete`
export const addDanhGia = `${host}/danhGia/add`
export const updateDanhGia = `${host}/danhGia/update`
// API Đặt Tour
export const insertDatTour = `${host}/datTour/insert`
export const getAllDatTour = `${host}/datTour/getAll`
export const getCheckedDatTour = `${host}/datTour/getChecked`
export const getNotCheckedDatTour = `${host}/datTour/getNotChecked`
export const checkDatTour = `${host}/datTour/adminCheck`
export const findDatTour = `${host}/datTour/find`
// API cho thống kê
export const insertThongKeTour = `${host}/thongKe/insert`
export const findThongKeTheoThang = `${host}/thongKe/find`
export const findByNam = `${host}/thongKe/findByNam`
export const findByThongKeTourNow = `${host}/thongKe/findByThongKeTourNow`
export const findThongKeByTourId = `${host}/thongKe/findByTourId?tourId=EzdyimgA7g3pEub8yo1r`
export const findByNamAndTourId = `${host}/thongKe/findByNamAndTourId`

// API cho tương tác tour
export const insertTuongTac = `${host}/tuongtac/insert`
export const updateTuongTac = `${host}/tuongtac/update`
export const likeTuongTac = `${host}/tuongtac/like`
export const unlikeTuongTac = `${host}/tuongtac/unlike`
export const planTuongTac = `${host}/tuongtac/plan`
export const dropOurPlanTuongTac = `${host}/tuongtac/dropOurPlan`
export const bookTuongTac = `${host}/tuongtac/book`
export const checkTuongTac = `${host}/tuongtac/check`
export const findAllTuongTac = `${host}/tuongtac/findAll`
// Api cho user
export const loginUser = `${host}/user/login`
export const loginEmail = `${host}/user/loginEmail`
export const get = `${host}/user/get`