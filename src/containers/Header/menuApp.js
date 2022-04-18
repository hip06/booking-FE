export const adminMenu = [
    { //quản lý
        name: 'menu.manage.manage',
        menus: [
            {
                name: 'menu.manage.crudUser', link: '/system/user-manage'
                // subMenus: [
                //     { name: 'menu.manage.', link: '/system/user-manage' },
                //     { name: 'menu.manage.', link: '/system/user-manage-redux' }
                // ]
            },
            { name: 'menu.manage.crudRedux', link: '/system/user-manage-redux' },
            { name: 'menu.manage.doctorManage', link: '/system/doctor-manage' },
            { name: 'menu.manage.adminManage' },
            { name: 'menuDoctor.manage.scheduleDoctor', link: '/system/manage-schedule-doctor' }

        ]
    },
    { //phòng khám
        name: 'menu.clinic.clinic',
        menus: [
            { name: 'menu.clinic.clinicManage', link: '/system/clinic-manage' },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //chuyên khoa
        name: 'menu.specialty.specialty',
        menus: [
            {
                name: 'menu.specialty.specManage', link: '/system/specialty-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.redux-manage', link: '/system/user-manage-redux' },
                // ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //cẩm nang
        name: 'menu.handBook.handBook',
        menus: [
            {
                name: 'menu.handBook.handBookManage', link: '/system/handbook-manage'
                //     subMenus: [
                //         { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //         { name: 'menu.system.system-administrator.redux-manage', link: '/system/user-manage-redux' },
                //     ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];

export const doctorMenu = [
    { //quản lý
        name: 'menuDoctor.manage.manage',
        menus: [
            { name: 'menuDoctor.manage.scheduleDoctor', link: '/system/manage-schedule-doctor' },
            { name: 'menuDoctor.manage.bookingManage', link: '/system/booking-manage' },
        ]
    },

];