import axios from "axios";
import { COMPANY_ADMIN_ROLE, SITE_ADMIN_ROLE, SUPER_ADMIN_ROLE } from "../components/User/constants";
import { COMPANIES_URL, SITES_URL } from "./config";

const sites = [
    {
        "id": 2,
        "name": "Testing Site 2",
        "latitude": 12.0003,
        "longitude": 12.1112,
        "phoneNumber": "+256709645302",
        "supervisorName": "Kirabo Ibrahim",
        "supervisorPhoneNumber": "+256709645302",
        "patrolType": "GROUP_PATROL",
        "companyId": 8,
        "admin": null
    },
    {
        "id": 1,
        "name": "Testing Site 1",
        "latitude": 12.0003,
        "longitude": 12.1112,
        "phoneNumber": "+256709645302",
        "supervisorName": "Kirabo Ibrahim",
        "supervisorPhoneNumber": "+256709645302",
        "patrolType": "GROUP_PATROL",
        "companyId": 8,
        "admin": {
            "id": 25,
            "companyId": 8,
            "email": "site-admin1@proton.me",
            "siteId": 1,
            "username": "site-admin1@proton.me",
            "firstName": "adminA",
            "lastName": "adminA",
            "role": "SITE_ADMIN_ROLE",
            "phoneNumber": "+256709645305"
        }
    }
];

const tags = [
    {
        "id": 5,
        "uid": "0862328725",
        "siteId": 2
    },
    {
        "id": 3,
        "uid": "0865298321",
        "siteId": 1
    },
    {
        "id": 2,
        "uid": "2197727827",
        "siteId": 1
    },
    {
        "id": 4,
        "uid": "4435464958",
        "siteId": 2
    },
    {
        "id": 1,
        "uid": "7539002698",
        "siteId": 1
    }
];

const securityGuards =[
    {
        "id": 24,
        "companyId": 8,
        "gender": "M",
        "uniqueId": "5887721509",
        "dateOfBirth": "2000-09-05",
        "armedStatus": true,
        "deployedSiteId": 1,
        "shiftId": 1,
        "username": "5887721509",
        "firstName": "SecC",
        "lastName": "SecC",
        "role": "SECURITY_GUARD_ROLE",
        "phoneNumber": "+256709645306"
    },
    {
        "id": 27,
        "companyId": 8,
        "gender": "M",
        "uniqueId": "4416220008",
        "dateOfBirth": "2000-09-05",
        "armedStatus": true,
        "deployedSiteId": 1,
        "shiftId": 2,
        "username": "4416220008",
        "firstName": "SecD",
        "lastName": "SecD",
        "role": "SECURITY_GUARD_ROLE",
        "phoneNumber": "+256709645308"
    },
    {
        "id": 22,
        "companyId": 8,
        "gender": "M",
        "uniqueId": "4174887885",
        "dateOfBirth": "2000-09-05",
        "armedStatus": false,
        "deployedSiteId": 2,
        "shiftId": 3,
        "username": "4174887885",
        "firstName": "SecA",
        "lastName": "SecA",
        "role": "SECURITY_GUARD_ROLE",
        "phoneNumber": "+256709645303"
    },
    {
        "id": 29,
        "companyId": 9,
        "gender": "M",
        "uniqueId": "2825401411",
        "dateOfBirth": "2000-09-05",
        "armedStatus": false,
        "deployedSiteId": 3,
        "shiftId": 4,
        "username": "2825401411",
        "firstName": "Vernon",
        "lastName": "Masaaba",
        "role": "SECURITY_GUARD_ROLE",
        "phoneNumber": "+256709645318"
    },
    {
        "id": 23,
        "companyId": 8,
        "gender": "M",
        "uniqueId": "2567345794",
        "dateOfBirth": "2000-09-05",
        "armedStatus": true,
        "deployedSiteId": 2,
        "shiftId": 3,
        "username": "2567345794",
        "firstName": "SecA",
        "lastName": "SecA",
        "role": "SECURITY_GUARD_ROLE",
        "phoneNumber": "+256709645304"
    },
];

const patrols = [
    {
        "id": 1,
        "date": "2023-10-15",
        "startTime": "09:00",
        "endTime": "09:30",
        "shiftId": 1,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 1,
            "name": "Testing Site 1",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 2,
        "date": "2023-10-15",
        "startTime": "09:00",
        "endTime": "09:30",
        "shiftId": 1,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 1,
            "name": "Testing Site 1",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 4,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 5,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 6,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 7,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 8,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 9,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 10,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 11,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 12,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 13,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 14,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 15,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
    {
        "id": 17,
        "date": "2023-10-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "shiftId": 3,
        "securityGuard": {
            "id": 22,
            "companyId": 8,
            "gender": "M",
            "uniqueId": "4174887885",
            "dateOfBirth": "2000-09-05",
            "armedStatus": false,
            "deployedSiteId": 2,
            "shiftId": 3,
            "username": "4174887885",
            "firstName": "SecA",
            "lastName": "SecA",
            "role": "SECURITY_GUARD_ROLE",
            "phoneNumber": "+256709645303"
        },
        "site": {
            "id": 2,
            "name": "Testing Site 2",
            "latitude": 12.0003,
            "longitude": 12.1112,
            "phoneNumber": "+256709645302",
            "supervisorName": "Kirabo Ibrahim",
            "supervisorPhoneNumber": "+256709645302",
            "patrolType": "GROUP_PATROL",
            "companyId": 8
        }
    },
];


class SiteService {
    async getMySites(user) {
        switch(user.role) {
            case SUPER_ADMIN_ROLE:
                const superAdminSitesUrl = SITES_URL;
                return await axios.get(superAdminSitesUrl).data.data;
            case COMPANY_ADMIN_ROLE:
                const companyAdminSitesUrl= `${COMPANIES_URL}/${user.companyId}/sites`;
                return (await axios.get(companyAdminSitesUrl)).data.data;
            case SITE_ADMIN_ROLE:
                const siteAdminSitesUrl = `${SITES_URL}/${user.managedSiteId}`;
                let { data: site } = await axios.get(siteAdminSitesUrl);
                return [site];
            default:
                return [];   
        }
    }

    async getSiteGuards(site) {
        const { data } = await axios.get(`${SITES_URL}/${site.id}`);
        const shifts = data.shifts;
        return shifts.reduce((securityGuards, shift)=> [...securityGuards, ...shift.securityGuards], [])
    }

    async getSiteTags(site) {
        const { data } = await axios.get(`${SITES_URL}/${site.id}`);
        return data.tags;
    }

    async getSitePatrols(site) {
        const { data } = await axios.get(`${SITES_URL}/${site.id}/patrols`);
        return data.data;
    }

}

const siteService = new SiteService();
export default siteService;