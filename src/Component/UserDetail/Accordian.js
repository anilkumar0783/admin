import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function ControlledAccordions({ data: initialData, name: initialName }) {
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState(initialData);
    const [name, setName] = useState(initialName);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        setData(initialData);
        setName(initialName);
    }, [initialData, initialName]);

    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{ position: "sticky", top: 0, zIndex: "10", background: "#b6bbbf" }}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', boxShadow: 0 }}>{data?.length}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <table className="table ml- table-borderless text-center" style={{ width: "100%" }}>
                            <thead className='mb-2 sticky top-0'>
                                {name === 'Recording' &&
                                    <tr className='' style={{ background: "#dee0e3", height: "50px" }}>
                                        <th>SNo</th>
                                        <th>Recording Name</th>
                                        <th>Size</th>
                                        <th>Record on</th>
                                        <th>Download</th>
                                    </tr>
                                }
                                {name === "Connection" &&
                                    <tr className='' style={{ background: "#dee0e3", height: "50px" }}>
                                        <th>SNo</th>
                                        <th>User Name</th>
                                        <th>Connected On</th>
                                    </tr>
                                }
                            </thead>
                            <tbody>
                                {data?.map((item, key) => (
                                    <tr key={key} className='bg-[#F0EBEB] mb-4'>
                                        {name === "Recording" ? (
                                            <>
                                                <td className="p-4">{key + 1}.</td>
                                                <td className="p-4">{truncateString(item.trackName,15)}</td>
                                                <td className="p-4">{item.size}mb</td>
                                                <td className="p-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4">
                                                    <Link to={item.trackUrl} className='flex justify-center items-center' style={{ fontWeight: "bold", borderRadius: "5px" }}>
                                                        <DownloadForOfflineIcon style={{ fontSize: "35px", color: "green" }} />
                                                    </Link>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="p-4">{key + 1}.</td>
                                                <td className="p-4">{item.userName}</td>
                                                <td className="p-4">{item.connectedOn } 15/06/24</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
