import React, { createContext, useContext, useEffect, useState } from "react";
import { Typography, TabList, Tab, TabPanel, Tabs, Box, CircularProgress, Breadcrumbs, Link } from "@mui/joy";
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import siteService from "../../services/site";
import SecurityGuardTable from "../SecurityGuardTable/SecurityGuardTable";
import PatrolTable from "../PatrolTable/PatrolTable";
import TagTable from "../TagTable/TagTable";
import { ErrorContext } from "../Error/Error";


export const SiteContext = createContext();

function SelectSite() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <ApartmentOutlinedIcon sx={{fontSize: 40, mb: 3}}/>
            <Typography level='h3' color='neutral'>Select a site to veiw details</Typography>
        </Box>
    );
}

function Loading() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 3}}>
            <CircularProgress size='sm' />
        </Box>
    );
}

export default function SiteDetail() {
    const TAGS_TAB = 0;
    const SECURITY_GUARDS_TAB = 1;
    const PATROLS_TAB = 2;
    
    const {selectedSite} = useContext(SiteContext);
    const { setError} = useContext(ErrorContext);
    const [tags, setTags] = useState([]);
    const [patrols, setPatrols] = useState([]);
    const [tagLoading, setTagLoading] = useState(false);
    const [patrolLoading, setPatrolLoading] = useState(false);
    const [securityGuardLoading, setSecurityGuardLoading] = useState(false)
    const [selectedTab, setSelectedTab] = useState(SECURITY_GUARDS_TAB);
    const [securityGuards, setSecurityGuards] = useState([]);

    function getSiteDetails() {
        if(selectedSite) {
            switch(selectedTab) {
                case TAGS_TAB:
                    setTagLoading(true);
                    siteService.getSiteTags(selectedSite)
                    .then((tags) => {
                        setTags(tags);
                    })
                    .catch((reason) => setError(reason.message))
                    .finally(() => setTagLoading(false));
                    break;
                case SECURITY_GUARDS_TAB:
                    setSecurityGuardLoading(true);
                    siteService.getSiteGuards(selectedSite)
                    .then((securityGuards) => {
                        setSecurityGuards(securityGuards);
                    })
                    .catch((reason) => setError(reason.message))
                    .finally(() => setSecurityGuardLoading(false))
                    break;
                case PATROLS_TAB:
                    setPatrolLoading(true);
                    siteService.getSitePatrols(selectedSite)
                    .then((patrols) => {
                        setPatrols(patrols);
                    })
                    .catch((reason) => setError(reason.message))
                    .finally(() => setPatrolLoading(false))
                    break;
                default:
                    return;
            }
        }
    }

    useEffect(() => {
        getSiteDetails(); 
    }, [selectedSite, selectedTab]);
    
        if(selectedSite) {
            return (
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                    <Breadcrumbs size="sm" separator={<ChevronRightRoundedIcon fontSize="sm" />} sx={{ pl: 0 }}>
                        <Link underline="none" color="neutral">
                            <HomeRoundedIcon />
                        </Link>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            My sites
                        </Typography>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            { selectedSite.name }
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Typography level='h2' component='h1' sx={{mb: 5}}>{selectedSite.name}</Typography>
                <Tabs size='md' defaultValue={SECURITY_GUARDS_TAB} onChange={(event, value) => setSelectedTab(value)}>
                <TabList>
                    <Tab value={TAGS_TAB}>Tags</Tab>
                    <Tab value={SECURITY_GUARDS_TAB}>Guards</Tab>
                    <Tab value={PATROLS_TAB}>Patrols</Tab>
                </TabList>
                <TabPanel value={TAGS_TAB}>
                    <TagTable tags={tags} />
                    {tagLoading && <Loading />}
                </TabPanel>
                <TabPanel value={SECURITY_GUARDS_TAB}>
                    <SecurityGuardTable securityGuards={securityGuards} />
                    {securityGuardLoading && <Loading />}
                </TabPanel>
                <TabPanel value={PATROLS_TAB}>
                    <PatrolTable patrols={patrols} />
                    {patrolLoading && <Loading />}
                </TabPanel> 
            </Tabs>
            </Box>
            );
    } else {
        return <SelectSite />
    }
}