
import React, { useEffect, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Button from 'react-bootstrap/Button';
import './MapBox.css'
import axios from "axios";
import { firebase } from '../../util/config';
import PopupNote from "../Popup/PopupNote";
import { Accordion } from "react-bootstrap";
import { deleteHoatDong, deleteTour, findAllTour, findAllsHDByTourId, insertHoatDong, insertTour, updateHoatDong, updateTour } from "../../util/ApiRouter";



function MapBox() {

  const [lng, setLng] = useState(106.68921221955645)
  const [lat, setLat] = useState(10.772420997560602)
  const [showPopup, setShowPopup] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null);
  // phuong tien
  const [phuongTien, setPhuongTien] = useState([])
  const [xeMay, setXeMay] = useState(false)
  const [oto, setOto] = useState(false)
  const [mayBay, setMayBay] = useState(false)

  //info Add Tour 
  const [tourId, setTourId] = useState('')
  const [tenTour, setTenTour] = useState('')
  const [theLoai, setTheLoai] = useState([])
  const [soNgay, setSoNgay] = useState()
  const [thongTinCT, setThongTinCT] = useState('')
  const [diaChi, setDiaChi] = useState('')
  const [xuHuong, setXuHuong] = useState()
  const [phoBien, setPhoBien] = useState()
  const [hinhAnh, setHinhAnh] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [danhGia, setDanhGia] = useState(5.0)
  const [showFormHoatDong, setShowFormHoatDong] = useState(false)
  const [isDeletePopup, setIsDeletePopup] = useState(false)
  const [isUpdatePopup, setIsUpdatePopup] = useState(false)
  const [isDeleteHoatDongPopup, setIsDeleteHoatDongPopup] = useState(false)
  const [isUpdateHoatDongPopup, setIsUpdateHoatDongPopup] = useState(false)
  // khai báo cho image
  const [image, setImage] = useState(null)
  const storage = firebase.storage()
  const [url, setUrl] = useState("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/background-loading.jpg?alt=media&token=8b25495c-0949-40a5-8ce6-3ea0bdfa6fdf");
  // Khai báo cho video
  const [video, setVideo] = useState(null)
  const [urlVideo, setUrlVideo] = useState("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/videop.mp4?alt=media&token=a3e3681b-f1a0-49ff-a6da-1b97f2e9d0af")
  // khai báo cho fike mp3
  const [amThanh, setAmThanh] = useState(null)
  const [urlAmThanh, setUrlAmThanh] = useState("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/mp3s%2Fsound.mp3?alt=media&token=cbb310b2-b3f6-49ae-9d95-3b5785393ccc")
  // upload image
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function
      },
      (error) => {
        // error function
        console.log(error);
      },
      () => {
        // complete function
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log(url)
          });
      }
    );
  };
  // upload doan phim
  const handleChangeVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };
  const handleUploadVideo = () => {
    const uploadTask = storage.ref(`videos/${video.name}`).put(video);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function
      },
      (error) => {
        // error function
        console.log(error);
      },
      () => {
        // complete function
        storage
          .ref('videos')
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            setUrlVideo(url);
            console.log(url)
          });
      }
    );
  };
  // upload âm thanh
  const handleChangeAmThanh = (e) => {
    if (e.target.files[0]) {
      setAmThanh(e.target.files[0]);
    }
  };
  const handleUploadAmThanh = () => {
    const uploadTask = storage.ref(`mp3s/${amThanh.name}`).put(amThanh);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function
        // set loading = true
      },
      (error) => {
        // error function
        console.log(error);
      },
      () => {
        // complete function
        storage
          .ref('mp3s')
          .child(amThanh.name)
          .getDownloadURL()
          .then((url) => {
            //setloading= false
            setUrlAmThanh(url);
            console.log(url)
          });
      }
    );
  };
  // List the loai
  const [thienNhien, setThienNhien] = useState(false)
  const [theThao, setTheThao] = useState(false)
  const [thamQuan, setThamQuan] = useState(false)
  const [nghiDuong, setNghiDuong] = useState(false)
  const [bien, setBien] = useState(false)
  const [tourClicked, setTourClicked] = useState({})

  const handleChangeTenTour = (e) => {
    let tenTour = e.target.value
    setTenTour(tenTour)
  }
  const handleChangeSoNgay = (e) => {
    let soNgay = e.target.value
    setSoNgay(soNgay)
  }
  const handleChangeThongTin = (e) => {
    let thongTin = e.target.value
    setThongTinCT(thongTin)
  }
  const handleChangeDiaChi = (e) => {
    let diaChi = e.target.value
    setDiaChi(diaChi);
    onChangeGetDataSearch(diaChi)
  }
 
  const handleChangeCheckTheLoai = (e) => {
    let isChecked = e.target.checked;
    console.log(e.target.checked)
    if (isChecked) {
      theLoai.push(e.target.name)
    } else {
      for (let index = 0; index < theLoai.length; index++) {
        const element = theLoai[index];
        if (element == e.target.name)
          theLoai.splice(index, 1)
      }
    }
    setTheLoai(theLoai)
    handleSetTheLoai(theLoai)
  }
  const handleCheckPhuongTien = (e) => {
    let isChecked = e.target.checked;
    console.log(e.target.checked)
    if (isChecked) {
      phuongTien.push(e.target.name)
      console.log(phuongTien)
    } else {
      for (let index = 0; index < phuongTien.length; index++) {
        const element = phuongTien[index];
        if (element == e.target.name)
          phuongTien.splice(index, 1)
      }
    }
    console.log(phuongTien)
    setPhuongTien(phuongTien)
    handleSetPhuongTien(phuongTien)
  }
  // THAO TÁC VỚI  TOUR
  const [listTour, setListTour] = useState([])
  const handleResultData = async () => {
    const result = await axios.get(findAllTour)
    if (result) {
      localStorage.setItem("dsTour", JSON.stringify(result.data))
      setListTour(result.data)
      console.log(result)
    } else {
      console.log("không thể load data")
    }
  }
  const handSubmit = async () => {
    const tourinsert = ({
      "tenTour": tenTour,
      "thongTin": thongTinCT,
      "viTri": diaChi,
      "soNgay": soNgay,
      "hinhAnh": [
        url,
      ],
      "theLoai": theLoai,
      "phuongTien": phuongTien,
      "danhGia": danhGia,
      "phoBien": phoBien,
      "xuHuong": xuHuong,
      "longitude": lng,
      "latitude": lat
    })
    console.log("successful")
    const result = await axios.post(insertTour, tourinsert)
    console.log(result)
  }
  //handle Click Cập nhật tour
  const handleUpdate = async () => {
    console.log("Click update")
    const tourupdate = ({
      "document_id": tourId,
      "tenTour": tenTour,
      "thongTin": thongTinCT,
      "viTri": diaChi,
      "soNgay": soNgay,
      "hinhAnh": [
        url
      ],
      "theLoai": theLoai,
      "phuongTien": phuongTien,
      "danhGia": 4.0,
      "phoBien": phoBien,
      "xuHuong": xuHuong,
      "longitude": 106.68921221955645,
      "latitude": 10.772420997560602
    })
    console.log(tourupdate)
    const result = await axios.put(updateTour, tourupdate)
    if (result) {
      console.log(result)
      handleResultData()
      setIsUpdatePopup(false
      )
    } else {
      console.log("Cập nhật tour thất bại!")
    }
  }
  // xóa tour
  const deleteTourById = (item) => {
    axios.delete(deleteTour, {
      params: {
        document_id: item.document_id
      }
    }).then((result) => {
      console.log(result)
      handleShowPopupDeleteTour()
      handleResultData()
    })

  }

  const handleShowPopupDeleteTour = () => {
    setIsDeletePopup(!isDeletePopup);
  }
  const handleShowPopupUpdateTour = () => {
    setIsUpdatePopup(!isUpdatePopup);
  }
  const handleShowPopupDeleteHoatDong = () => {
    setIsDeleteHoatDongPopup(!isDeleteHoatDongPopup);
  }
  const handleShowPopupUpdateHoatDong = () => {
    setIsUpdateHoatDongPopup(!isUpdateHoatDongPopup);
  }
  // Click Thêm mới tour
  const handleClickThemTour = () => {
    setTourId("")
    setTenTour("")
    setTheLoai([])
    setPhuongTien([])
    setSoNgay("")
    setThongTinCT("")
    setDiaChi("")
    setHinhAnh("")
    setVideo("")
    setAmThanh("")
    setShowForm(true)
    setXuHuong(false)
    setPhoBien(false)
    // set for the loai
    setBien(false)
    setThamQuan(false)
    setTheThao(false)
    setNghiDuong(false)
    setThienNhien(false)
    // set phuong tien
    setXeMay(false)
    setOto(false)
    setMayBay(false)
    setShowFormHoatDong(false)
    setUrl("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/background-loading.jpg?alt=media&token=8b25495c-0949-40a5-8ce6-3ea0bdfa6fdf")
  }
  // Chọn tour
  const handleClickItem = (item) => {
    // tour.document_id = item.document_id
    setTourId(item.document_id)
    setTenTour(item.tenTour)
    setTheLoai(item.theLoai)
    setPhuongTien(item.phuongTien)
    setSoNgay(item.soNgay)
    setThongTinCT(item.thongTin)
    setDiaChi(item.viTri)

    setHinhAnh(item.hinhAnh[0])
    setUrl(item.hinhAnh[0])

    setLat(item.latitude)
    setLng(item.longitude)
    setPhoBien(item.phoBien)
    setXuHuong(item.xuHuong)
    setShowForm(true)
    handleResultHoatDongTour(item)
    setShowFormHoatDong(false)
    handleSetTheLoai(item.theLoai)
    handleSetPhuongTien(item.phuongTien)

    setViewState({
      longitude: item.longitude,
      latitude: item.latitude,
      zoom: 11.5
    })
    console.log(item)
    setTourClicked(item)
    setPopupInfo({
      "name": item.tenTour,
      "address": item.viTri,
      "lng": item.longitude,
      "lat": item.latitude,
      "image": item.hinhAnh[0]
    })
    setShowPopup(true)
    setUrl(item.hinhAnh[0])
  }
  // Chọn thể loại
  const handleSetTheLoai = (listTheLoai) => {

    if (listTheLoai.includes("thien nhien")) {
      setThienNhien(true)
    } else {
      setThienNhien(false)
    }

    if (listTheLoai.includes("the thao")) {
      setTheThao(true)
    } else {
      setTheThao(false)
    }

    if (listTheLoai.includes("tham quan")) {
      setThamQuan(true)
    } else {
      setThamQuan(false)
    }
    if (listTheLoai.includes("nghi duong")) {
      setNghiDuong(true)
    } else {
      setNghiDuong(false)
    }
    if (listTheLoai.includes("bien")) {
      setBien(true)
    } else {
      setBien(false)
    }

  }
  //
  const handleSetPhuongTien = (listPhuongTien) => {

    if (listPhuongTien.includes("xe máy")) {
      setXeMay(true)
    } else {
      setXeMay(false)
    }

    if (listPhuongTien.includes("ô tô")) {
      setOto(true)
    } else {
      setOto(false)
    }

    if (listPhuongTien.includes("máy bay")) {
      setMayBay(true)
    } else {
      setMayBay(false)
    }
  }
  // get data tour when show popup
  //THAO TÁC VỚI HOẠT ĐỘNG
  const [listHoatDong, setListHoatDong] = useState([])
  const [thoiGianHD, setThoiGianHD] = useState()
  const [viTriHD, setViTriHD] = useState()
  const [thongTinHD, setThongTinHD] = useState()
  const [tieuDeHD, setTieuDeHD] = useState()
  const [maHD, setMaHD] = useState()
  const handleChangeTieuDe = (e) => {
    setTieuDeHD(e.target.value)
  }
  const handleChangeThoiGian = (e) => {
    setThoiGianHD(e.target.value)
  }
  const handleChangeThongTinHD = (e) => {
    setThongTinHD(e.target.value)
  }
  const handleChangeDiaChiHD = (e) => {
    setViTriHD(e.target.value)
    onChangeGetDataSearchHD(e.target.value)
  }
  //Search vị trí Hoạt động
  const [listSearchHD, setListSearchHD] = useState([])
  const onChangeGetDataSearchHD = async (address) => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg`)
      .then(function (response) {
        setListSearchHD(response.data.features)
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {

      })
  }
  // get danh sách hoạt động của tour
  const handleResultHoatDongTour = async (item) => {
    const result = await axios.get(findAllsHDByTourId, {
      params: {
        tourId: item.document_id
      }
    })
    if (result != null) {
      setListHoatDong(result.data)
    } else {
      console.log("Loi get data")
    }
  }
  // chọn hoạt động
  const [hoatDongChecked, setHoatDongChecked] = useState({})
  const handleClickHoatDong = (item) => {
    setMaHD(item.id)
    setTieuDeHD(item.tieuDe)
    setViTriHD(item.viTri)
    setThongTinHD(item.thongTin)
    setThoiGianHD(item.thoiGianHD)
    setViewState({
      longitude: item.longitude,
      latitude: item.latitude,
      zoom: 11.5
    })
    setUrlAmThanh(item.amThanh)
    if (item.amThanh) {
      setAmThanh(item.amThanh)
      setUrlAmThanh(item.amThanh)
    } else {
      setUrlAmThanh("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/mp3s%2Fsound.mp3?alt=media&token=cbb310b2-b3f6-49ae-9d95-3b5785393ccc")
    }
    if (item.hinhAnh[0]) {
      setUrl(item.hinhAnh[0])
    } else {
      setUrl("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/background-loading.jpg?alt=media&token=8b25495c-0949-40a5-8ce6-3ea0bdfa6fdf")
    }
    if (item.doanPhim) {
      setVideo(item.doanPhim)
      setUrlVideo(item.doanPhim)
    } else {
      setUrlVideo("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/videop.mp4?alt=media&token=a3e3681b-f1a0-49ff-a6da-1b97f2e9d0af")
    }
    setLat(item.latitude)
    setLng(item.longitude)
    setViewState({
      longitude: item.longitude,
      latitude: item.latitude,
      zoom: 11.5
    })
    setShowForm(false)
    setShowFormHoatDong(true)
    setHoatDongChecked(item)
    setPopupInfo({
      "name": item.tieuDe,
      "address": item.viTri,
      "lng": item.longitude,
      "lat": item.latitude,
      "image": item.hinhAnh[0]
    })
    setShowPopup(true)
    setUrl(item.hinhAnh[0])
  }
  // tạo hoạt động
  const handleClickCreateHoatDong = () => {
    setMaHD("")
    setTieuDeHD("")
    setViTriHD("")
    setThongTinHD("")
    setThoiGianHD("")
    setVideo("")
    setAmThanh("")
    setShowForm(false)
    setShowFormHoatDong(true)
    setUrlVideo("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/videop.mp4?alt=media&token=a3e3681b-f1a0-49ff-a6da-1b97f2e9d0af")
    setUrl("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/background-loading.jpg?alt=media&token=8b25495c-0949-40a5-8ce6-3ea0bdfa6fdf")
    setUrlAmThanh("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/mp3s%2Fsound.mp3?alt=media&token=cbb310b2-b3f6-49ae-9d95-3b5785393ccc")
  }
  const deleteHoatDongById = async (item) => {
    const result = await axios.delete(deleteHoatDong , {
      params: {
        document_id: item.id
      }
    })
    console.log(result)
    handleResultHoatDongTour(tourClicked)
    setIsDeleteHoatDongPopup(!isDeleteHoatDongPopup)
    setShowFormHoatDong(!showFormHoatDong)
  }
  // Click button them hoat dong
  const handleThemHoatDong = async () => {
    const new_hoatDong = ({
      "thoiGianHD": thoiGianHD,
      "viTri": viTriHD,
      "thongTin": thongTinHD,
      "tieuDe": tieuDeHD,
      "tourId": tourId,
      "hinhAnh": [
        url
      ],
      "amThanh": urlAmThanh,
      "doanPhim": urlVideo,
      "longitude": lng,
      "latitude": lat
    })
    console.log("successful")
    const result = await axios.post(insertHoatDong, new_hoatDong)
    console.log(result)
    handleResultHoatDongTour(tourClicked)
    setShowFormHoatDong(!showFormHoatDong)
  }
  // Cập nhật hoạt động
  const handleUpdateHoatDong = async () => {
    console.log("Click update")
    const new_hoatDong = ({
      "id": maHD,
      "thoiGianHD": thoiGianHD,
      "viTri": viTriHD,
      "thongTin": thongTinHD,
      "tieuDe": tieuDeHD,
      "tourId": tourId,
      "hinhAnh": [
        url
      ],
      "amThanh": urlAmThanh,
      "doanPhim": urlVideo,
      "longitude": lng,
      "latitude": lat
    })
    console.log(new_hoatDong)
    const result = await axios.put(updateHoatDong, new_hoatDong)
    if (result) {
      console.log(result)
      handleResultHoatDongTour(tourClicked)
      console.log(tourClicked)
      setIsUpdateHoatDongPopup(false)
    } else {
      console.log("Cập nhật hoạt động thất bại!")
    }
  }
  //Kết thúc cập nhật
  const handDiaChiThanhToaDo = async (address) => {
    let arrNewAddress = []
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg`)
      .then(function (response) {
        console.log(response)
        arrNewAddress.push({
          lng: response.data.features[0].center[0],
          lat: response.data.features[0].center[1]
        })
        setLat(arrNewAddress[0].lat)
        setLng(arrNewAddress[0].lng)
        setViewState({
          longitude: response.data.features[0].center[0],
          latitude: response.data.features[0].center[1],
          zoom: 11.5
        })
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {

      })
    console.log(arrNewAddress)
  }
  //Search vị trí
  const [listSearch, setListSearch] = useState([])
  const onChangeGetDataSearch = async (address) => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg`)
      .then(function (response) {
        setListSearch(response.data.features)
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {

      })
  }
  // chọn address sau khi search 
  const hanDleClickItemSearch = (item) => {
    setLng(item.center[0])
    setLat(item.center[1])
    setViewState({
      longitude: item.center[0],
      latitude: item.center[1],
      zoom: 11.5
    })
    setDiaChi(item.place_name)
    setViTriHD(item.place_name)
    setListSearch([])
    setListSearchHD([])
  }
  // const mapRef = React.useRef();
  const [viewState, setViewState] = React.useState({
    longitude: lng,
    latitude: lat,
    zoom: 11.5
  });

  //useEffect
  useEffect(() => {
    handleResultData()
    setListSearch([])
    setListSearchHD([])
  }, [ listHoatDong])

  return (
    <Map
      // onLoad={onMapLoad}
      {...viewState}
      mapboxAccessToken='pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg'
      onClick={(e) => {
        setLat(e.lngLat.wrap().lat)
        setLng(e.lngLat.wrap().lng)
        setViewState({
          longitude: e.lngLat.wrap().lng,
          latitude: e.lngLat.wrap().lat,
          zoom: 11.5
        })
        console.log({ lng: e.lngLat.wrap().lng, lat: e.lngLat.wrap().lat })
      }}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"

    >
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="bottom"
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          // setPopupInfo(data);
          setShowPopup(true)
        }}

      >
        <img src="https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/mapbox-icon.png?alt=media&token=a70dd5be-1312-4f84-aa53-c0b6092b9e75" alt="img-maker-icon"/>
      </Marker>
      {showPopup && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.lng)}
          latitude={Number(popupInfo.lat)}
          onClose={() => setShowPopup(false)}
        >
          <div>
            {popupInfo.name}, {popupInfo.address} |{' '}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.name}`}
            >
              Wikipedia
            </a>
          </div>
          <img width="100%" src={popupInfo.image} alt="img-hd-tour"/>
        </Popup>
      )}
      <NavigationControl position="bottom-right" />
      <FullscreenControl />
      <ScaleControl />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <div className="form-them">
        <div className="form-them-list-tour">
          <h3 className="title-ds-tour">Danh sách tour: </h3>
          {/* <hr /> */}
          {/* // fix thanh scroll view */}
          <div className='item-tour' onClick={() => handleClickThemTour()}>
            <div style={{
              display: "flex",
              height: 50,
              width: 50,
              backgroundColor: "gray",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              // padding: '10px'
              justifyContent: "center"
            }} >
              <h1 style={{
                textAlign: 'center'
              }}>+</h1>
            </div>
            <p className="item-ten-tour">Thêm tour</p>
          </div>
          <div className="ds-tour">
            {
              listTour.map((item, index) => {
                return <div key={item.document_id} className='item-tour'>
                  <div onClick={() => handleClickItem(item)} className="hoat-dong-filter">
                    <div style={{
                      height: 50,
                      width: 50,
                      backgroundImage: `url(${item.hinhAnh[0]})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      // padding: '10px'
                    }} >
                    </div>
                    <p className="item-ten-tour">{item.tenTour}</p>
                  </div>

                </div>
              })
            }
          </div>
          {/* Hoat dong */}
          <div className="list-hoat-dong">
            <p className="title-hoat-dong">Hoạt động</p>
            {/* <hr /> */}
            {
              tourId ? <div className='item-tour' onClick={() => handleClickCreateHoatDong()}>
                <div style={{
                  display: "flex",
                  height: 50,
                  width: 50,
                  backgroundColor: "gray",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  // padding: '10px'
                  justifyContent: "center"
                }} >
                  <h1 style={{
                    textAlign: 'center'
                  }}>+</h1>
                </div>
                <p className="item-ten-tour">Thêm hoạt động</p>
              </div> : ""
            }
            <div className="ds-hoat-dong">
              {/* // fix thanh scroll view */}
              {
                listHoatDong.map((item, index) => {
                  return <div key={index} className='item-hoat-dong'>
                    <div onClick={() => handleClickHoatDong(item)} className="hoat-dong-filter">
                      <div style={{
                        height: 50,
                        width: 50,
                        backgroundImage: `url(${item.hinhAnh[0]})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        // padding: '10px'
                      }} >
                      </div>
                      <p className="item-tieu-de">{item.tieuDe}</p>
                    </div>

                  </div>
                })
              }
            </div>
          </div>
        </div>

        {
          showForm ?
            <Form style={{ display: 'flex', flex: 0.5, backgroundColor: '#e0ffff', minWidth: 450, width: '100%', height: "100%", justifyContent: "flex-start", overflow: "auto" }} className='group-control' onSubmit={() => handSubmit()}>
              <Form.Group className='title-them-tour' style={{ width: "100%" }}>
                <Button variant="outline-danger"
                  onClick={() => setShowForm(!showForm)}
                  style={{ float: "right", textAlign: 'end', fontSize: 15, fontWeight: 'bold', cursor: 'pointer' }} className='btn-dong'>X </Button>
                <h5 className='label-title-tour' style={{ fontSize: 25 }}>Thông tin tour</h5>
              </Form.Group>
              <Form.Group className='title-them-tour'>
                {tourId !== '' ? <p>ID: {tourId}</p> : ""}
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className='label-ten-tour'>Tên tour:</Form.Label>
                <Form.Control
                  name='tenTour'
                  value={tenTour}
                  onChange={e => handleChangeTenTour(e)}
                  type="text" placeholder="VD:Tour Nha Trang, Tour Đà Nẵng" required />
              </Form.Group>
              <Form.Label className='label-loai-tour'>Thể loại:</Form.Label>
              <Form.Group style={{ display: 'flex', width: "100%" }}>
                <Form.Check
                  type="switch"
                  label="Thiên nhiên"
                  checked={thienNhien}
                  name="thien nhien"
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setThienNhien(!thienNhien)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />

                <Form.Check
                  type="switch"
                  label="Thể thao"
                  name="the thao"
                  checked={theThao}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setTheThao(!theThao)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />
                <Form.Check
                  type="switch"
                  label="Tham quan"
                  name="tham quan"
                  checked={thamQuan}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setThamQuan(!thamQuan)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />
                <Form.Check
                  type="switch"
                  label="Nghỉ dưỡng"
                  name="nghi duong"
                  checked={nghiDuong}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setNghiDuong(!nghiDuong)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />
                <Form.Check
                  type="switch"
                  label="Biển"
                  name="bien"
                  checked={bien}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setBien(!bien)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />
              </Form.Group>
              <Form.Label className='label-loai-tour'>Phương tiện:</Form.Label>
              <Form.Group style={{ display: 'flex', width: "100%" }}>
                <Form.Check
                  type="switch"
                  label="xe máy"
                  checked={xeMay}
                  name="xe máy"
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setXeMay(!xeMay)}
                  onChange={e => handleCheckPhuongTien(e)}
                />

                <Form.Check
                  type="switch"
                  label="ô tô"
                  name="ô tô"
                  checked={oto}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setOto(!oto)}
                  onChange={e => handleCheckPhuongTien(e)}
                />
                <Form.Check
                  type="switch"
                  label="máy bay"
                  name="máy bay"
                  checked={mayBay}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setMayBay(!mayBay)}
                  onChange={e => handleCheckPhuongTien(e)}
                />
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className='label-login'>Số ngày diễn ra: </Form.Label>
                <Form.Select
                  name="soNgay"
                  value={soNgay}
                  onChange={e => handleChangeSoNgay(e)}
                  aria-label="Default select example">
                  <option>Số ngày </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="9">2 tuần</option>
                </Form.Select>
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>

                <FloatingLabel controlId="floatingTextarea2" label="Thông tin chi tiết" style={{ marginTop: 10 }}>
                  <Form.Control
                    name="thongTin"
                    value={thongTinCT}
                    onChange={e => handleChangeThongTin(e)}
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group style={{ width: "100%" }}>
                <Form.Label className='label-login'>Địa chỉ :</Form.Label>
                <Form.Control
                  name='viTri'
                  value={diaChi}
                  onChange={e => handleChangeDiaChi(e)}
                  autoComplete="strees-address"
                  type="text" placeholder="VD: 01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000" required />
                <Button style={{ marginTop: 10 }} onClick={() => handDiaChiThanhToaDo(diaChi)} type="button" variant="info">Tìm kiếm</Button>{' '}
                <div className="search-result-address">
                  {
                    listSearch.map((item, index) => {
                      return <div key={index} onClick={() => hanDleClickItemSearch(item)} className='search-address'>
                        <p>{item.place_name}</p>
                      </div>
                    })
                  }
                </div>


              </Form.Group>
              <Form.Label className='label-locate'>vị trí trên bản đồ: </Form.Label>
              <Form.Group style={{ marginTop: 10, width: "100%", display: 'flex', flexDirection: 'row' }}>
                <Form.Group style={{ flex: 0.48 }}>
                  <Form.Label className='label-loai-tour'>longitude:</Form.Label>
                  <Form.Control
                    name='longitude'
                    value={lng}
                    type="text" placeholder="VD: 100.1" required />
                </Form.Group>
                <Form.Group style={{ flex: 0.48, marginLeft: 5 }}>
                  <Form.Label className='label-loai-tour'>latitude:</Form.Label>
                  <Form.Control
                    name='latitude'
                    value={lat}
                    type="text" placeholder="VD: 10.0001" required />
                </Form.Group>
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={xuHuong}
                  label="Xu hướng"
                  onClick={() => setXuHuong(!xuHuong)}
                // onChange={e => handleChangeCheckXuHuong(e)}
                />
                <Form.Check
                  type="switch"
                  label="phổ biến"
                  id="disabled-custom-switch"
                  checked={phoBien}
                  onClick={() => setPhoBien(!phoBien)}
                // onChange={e => handleChangeCheckPhoBien(e)}
                />
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className='label-hinhAnh'>Hình Ảnh:</Form.Label>
                <div className="view-hinhAnh">
                  <img style={{ width: 130 }} className='image' src={url} alt="img" />
                  <div className="group-btn-file">
                    <input type='file' onChange={handleChange} alt='uri img' ></input>
                    <Button style={{ marginTop: 10 }} variant="outline-secondary" onClick={handleUpload}>Upload Image</Button>{' '}
                  </div>
                </div>
              </Form.Group>
              <Form.Group style={{ paddingLeft: 1, height: 30, margin: 5, width: "100%" }}>
                {tourId !== '' ?
                  <div style={{ width: "100%", height: 40, display: 'flex', flexDirection: 'row' }}>
                    <Button style={{ flex: 0.5, marginRight: 5 }}
                      onClick={() => handleShowPopupUpdateTour()}
                      type="button"
                      variant="warning">Cập nhật</Button>
                    <Button style={{ flex: 0.5 }} onClick={() => handleShowPopupDeleteTour()} variant="danger" >Xóa</Button>
                    <PopupNote className="xoa_popub" showInfoPopup={isDeletePopup} trigger={isDeletePopup} setTrigger={setIsDeletePopup} >
                      <div
                        style={{
                          minHeight: '200px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 18,
                          margin: 20
                        }}>
                        <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                          <p style={{ color: 'gray', flex: 0.9 }}> Delete Data </p>
                          <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsDeletePopup(false)}>x</Button>
                        </div>
                        <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ bị xóa khỏi dữ liệu</p>
                        <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                        <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p>
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                          <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsDeletePopup(false)}>Cancel</Button>
                          <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => deleteTourById(tourClicked)}>Start delete</Button>
                        </div>
                      </div>
                    </PopupNote>
                    
                    <PopupNote className="xoa_popub" showInfoPopup={isUpdatePopup} trigger={isUpdatePopup} setTrigger={setIsUpdatePopup} >
                      <div
                        style={{
                          minHeight: '200px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 18,
                          margin: 20
                        }}>
                        <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                          <p style={{ color: 'gray', flex: 0.9 }}> Update Data </p>
                          <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsUpdatePopup(false)}>x</Button>
                        </div>
                        <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ cập nhật vào dữ liệu</p>
                        <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                        <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p>
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                          <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsUpdatePopup(false)}>Cancel</Button>
                          <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => handleUpdate()}>Start Update</Button>
                        </div>
                      </div>
                    </PopupNote>
                  </div>
                  : <Button style={{ width: 150 }} type="submit" variant="primary">Thêm</Button>
                }
              </Form.Group>

            </Form> : ""
        }

        {/* Form hoạt động */}
        {
          showFormHoatDong ?
            <Form style={{ minWidth: 450, display: 'flex', flex: 0.5, backgroundColor: '#e0ffff', justifyContent: 'flex-start', flexDirection: 'column', overflow: "scroll" }} className='group-control'>

              <Form.Group className='title-them-tour' style={{ width: "100%" }}>
                <Button variant="outline-danger"
                  onClick={() => setShowFormHoatDong(!showFormHoatDong)}
                  style={{ float: "right", textAlign: 'end', fontSize: 15, fontWeight: 'bold', cursor: 'pointer' }} className='btn-dong'>X </Button>
                <h5 className='label-title-tour' style={{ fontSize: 25 }}>Thông tin hoạt động</h5>
              </Form.Group>
              <Form.Group className='title-them-tour' style={{ width: "100%" }}>
                <h6 className='label-title-tour'>Mã tour: {tourId}</h6>
                <h6 className='label-title-tour'>Mã hd: {maHD}</h6>
              </Form.Group>

              <Form.Group style={{ height: '50px', width: "100%" }}>
                <Form.Label style={{ height: '15px' }} className='label-ten-tour'>Tiêu đề hoạt động:</Form.Label>
                <Form.Control
                  name='tenhd'
                  style={{ height: '28px' }}
                  value={tieuDeHD}
                  onChange={e => handleChangeTieuDe(e)}
                  type="text" placeholder="tiêu đề" required />
              </Form.Group>
              <Form.Group style={{ height: '50px', width: "100%" }}>
                <Form.Label style={{ height: '15px' }} className='label-loai-tour'>Thời gian:</Form.Label>
                <Form.Control
                  name='thoigian'
                  contentEditable={"true"}
                  style={{ height: '28px' }}
                  value={thoiGianHD}
                  onChange={e => handleChangeThoiGian(e)}
                  type="text" placeholder="VD: Hoạt động 1" required />
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>
                {/* <Form.Label className='label-login'>Thông tin chi tiết: </Form.Label> */}
                <FloatingLabel controlId="floatingTextarea2" label="Thông tin chi tiết" style={{ marginTop: 10 }}>
                  <Form.Control
                    onChange={e => handleChangeThongTinHD(e)}
                    value={thongTinHD}
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '150px' }}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group style={{ height: '80px', width: "100%" }}>
                <Form.Label style={{ height: '15px' }} className='label-login'>Địa chỉ :</Form.Label>
                <Form.Control
                  style={{ height: '30px' }}
                  name='email'
                  value={viTriHD}
                  onChange={e => handleChangeDiaChiHD(e)}
                  autoComplete="strees-address"
                  type="text" placeholder="VD: 01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000" required />
                <Button style={{ height: '34px', paddingTop: 4, marginTop: 3 }} onClick={() => handDiaChiThanhToaDo(viTriHD)} type="button" variant="info">Tìm kiếm</Button>{' '}
                <div className="search-address-hd">
                  {
                    listSearchHD.map((item, index) => {
                      return <div key={index} onClick={() => hanDleClickItemSearch(item)} className='search-address'>
                        <p>{item.place_name}</p>
                      </div>
                    })
                  }
                </div>

              </Form.Group>
              <Form.Group style={{ marginTop: 10, width: "100%", display: "flex", flexDirection: "row" }}>
                <Form.Group style={{ flex: 0.5 }}>
                  <Form.Label className='label-loai-tour'>longitude:</Form.Label>
                  <Form.Control
                    name='longitude'
                    value={lng}
                    // onChange={e => handleChange(e)}
                    type="text" placeholder="VD: 100.1" required />
                </Form.Group>
                <Form.Group style={{ flex: 0.5, marginLeft: 5 }}>
                  <Form.Label className='label-loai-tour'>latitude:</Form.Label>
                  <Form.Control
                    name='latitude'
                    value={lat}
                    // onChange={e => handleChange(e)}
                    type="text" placeholder="VD: 10.0001" required />
                </Form.Group>
              </Form.Group>

              <Form.Group style={{ width: "100%", height: 400 }}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Hình ảnh:</Accordion.Header>
                    <Accordion.Body>
                      <div className="view-hinh-anh">
                        <img style={{ width: 80 }} className='image' src={url} alt="img" />
                        <div className="group-btn-file">
                          <input type='file' onChange={handleChange} alt='uri img' ></input>
                          <Button style={{ marginTop: 10 }} variant="outline-secondary" onClick={handleUpload}>Upload</Button>{' '}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Âm thanh giới thiệu:</Accordion.Header>
                    <Accordion.Body>
                      <div className="view-am-thanh">
                        <audio style={{ width: 330 }} src={urlAmThanh} controls />
                        <div>
                          <input type='file' onChange={handleChangeAmThanh} alt='uri amThanh' ></input>
                          <Button style={{ marginTop: 10 }} variant="outline-secondary" onClick={handleUploadAmThanh}>Upload</Button>{' '}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Đoạn phim giới thiệu:</Accordion.Header>
                    <Accordion.Body>
                      <div className="view-doan-phim">
                        <video style={{ width: 130 }} src={urlVideo} controls>
                          Your browser does not support the video tag.
                        </video>
                        <div className="group-btn-file">
                          <input type='file' onChange={handleChangeVideo} alt='uri img' ></input>
                          <Button style={{ marginTop: 10 }} variant="outline-secondary" onClick={handleUploadVideo}>Upload</Button>{' '}
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Form.Group>

              <Form.Group style={{ paddingLeft: 1, margin: 5, width: "100%" }}>
                {maHD !== '' ?
                  <div style={{ width: "100%", height: 40, display: 'flex', flexDirection: 'row' }}>

                    <Button style={{ flex: 0.5, marginRight: 5 }}
                      onClick={() => handleShowPopupUpdateHoatDong()}
                      type="button"
                      variant="warning">Cập nhật</Button>
                    <Button style={{ flex: 0.5 }} onClick={() => handleShowPopupDeleteHoatDong()} variant="danger">Xóa </Button>
                    {/* Popup Update */}
                    <PopupNote className="update_popub" showInfoPopup={isUpdateHoatDongPopup} trigger={isUpdateHoatDongPopup} setTrigger={setIsUpdateHoatDongPopup} >
                      <div
                        style={{
                          minHeight: '250px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 18,
                          margin: 20
                        }}>
                        <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                          <p style={{ color: 'gray', flex: 0.9 }}> Update Data </p>
                          <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsUpdateHoatDongPopup(false)}>x</Button>
                        </div>
                        <p style={{ color: "red", fontSize: 14 }}>Thông tin hoạt động sẽ bị thay đổi trong dữ liệu</p>
                        <p style={{ color: "gray" }}>Mã Hoạt động: {hoatDongChecked.id}</p>
                        <p style={{ color: "gray" }}>Tên Hoạt động: {hoatDongChecked.tieuDe}</p>
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                          <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsUpdateHoatDongPopup(false)}>Cancel</Button>
                          <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => handleUpdateHoatDong()}>Start update</Button>
                        </div>
                      </div>
                    </PopupNote>
                    {/* Popup delete */}
                    <PopupNote className="xoa_popub" showInfoPopup={isDeleteHoatDongPopup} trigger={isDeleteHoatDongPopup} setTrigger={setIsDeleteHoatDongPopup} >
                      <div
                        style={{
                          minHeight: '250px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 18,
                          margin: 20
                        }}>
                        <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                          <p style={{ color: 'gray', flex: 0.9 }}> Delete Data </p>
                          <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsDeleteHoatDongPopup(false)}>x</Button>
                        </div>
                        <p style={{ color: "red", fontSize: 14 }}>Thông tin hoạt động sẽ bị xóa khỏi dữ liệu</p>
                        <p style={{ color: "gray" }}>Mã tour: {hoatDongChecked.id}</p>
                        <p style={{ color: "gray" }}>Tên tour: {hoatDongChecked.tieuDe}</p>
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                          <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsDeleteHoatDongPopup(false)}>Cancel</Button>
                          <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => deleteHoatDongById(hoatDongChecked)}>Start delete</Button>
                        </div>
                      </div>
                    </PopupNote>
                  </div>
                  : <Button style={{ width: 150 }} type="button" variant="primary" onClick={() => handleThemHoatDong()}>Thêm</Button>
                }
              </Form.Group>

            </Form> : ""
        }
      </div>
    </Map>
  );
}

export default MapBox;
