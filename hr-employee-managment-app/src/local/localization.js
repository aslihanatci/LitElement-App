const messages = {
    en: {
      employees: 'Employees',
      addNew: 'Add New',
      employeeList: 'Employee List',
      employeeListHeader: "Employee List",
      searchPlaceholder: "Search employees...",
      listView: "📋 List View",
      tableView: "📊 Table View",
      firstName: "First Name",
      lastName: "Last Name",
      dateOfEmployment: "Date of Employment",
      dateOfBirth: "Date of Birth",
      phone: "Phone",
      email: "Email",
      department: "Department",
      position: "Position",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      previousPage: "‹",
      nextPage: "›",
      form_firstName: "First Name",
      form_lastName: "Last Name",
      form_dateOfEmployment: "Date of Employment",
      form_dateOfBirth: "Date of Birth",
      form_phone: "Phone Number",
      form_email: "Email Address",
      form_department: "Department",
      form_selectDepartment: "Select Department",
      form_analytics: "Analytics",
      form_tech: "Tech",
      form_position: "Position",
      form_selectPosition: "Select Position",
      form_junior: "Junior",
      form_medior: "Medior",
      form_senior: "Senior",
      form_create: "Create",
      form_update: "Update",
      form_cancel: "Cancel"
    },
    tr: {
      employees: 'Çalışanlar',
      addNew: 'Yeni Ekle',
      employeeList: 'Çalışan Listesi',
      employeeListHeader: "Çalışan Listesi",
      searchPlaceholder: "Çalışanlarda ara...",
      listView: "📋 Liste Görünümü",
      tableView: "📊 Tablo Görünümü",
      firstName: "Ad",
      lastName: "Soyad",
      dateOfEmployment: "İşe Giriş Tarihi",
      dateOfBirth: "Doğum Tarihi",
      phone: "Telefon",
      email: "E-posta",
      department: "Departman",
      position: "Pozisyon",
      actions: "İşlemler",
      edit: "Düzenle",
      delete: "Sil",
      previousPage: "‹",
      nextPage: "›",
      form_firstName: "Ad",
      form_lastName: "Soyad",
      form_dateOfEmployment: "İşe Başlama Tarihi",
      form_dateOfBirth: "Doğum Tarihi",
      form_phone: "Telefon Numarası",
      form_email: "E-posta Adresi",
      form_department: "Departman",
      form_selectDepartment: "Departman Seç",
      form_analytics: "Analitik",
      form_tech: "Teknoloji",
      form_position: "Pozisyon",
      form_selectPosition: "Pozisyon Seç",
      form_junior: "Yeni Başlayan",
      form_medior: "Orta Seviye",
      form_senior: "Kıdemli",
      form_create: "Oluştur",
      form_update: "Güncelle",
      form_cancel: "İptal"
    },
  };
  
  export function localize(key, lang) {
    return messages[lang]?.[key] || key;
  }
  