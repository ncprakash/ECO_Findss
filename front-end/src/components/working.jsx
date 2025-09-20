import React from "react";
import { MdUploadFile } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdDiversity3 } from "react-icons/md";

export default function Working(){
    const data=[
        {
            icons:<MdUploadFile className="text-green-500 text-5xl mb-4" />,
            title:'1. Upload your item',
            des:"Share details and photos of your item to showcase it to the community"
        },
        {
            icons:<FaUsers className="text-green-500 text-5xl mb-4" />,
            title:"2. Connect with the community",
            des:"Engage with other users who are interested in borrowing or receiving your item."
        },
        {icons:<MdDiversity3 className="text-green-500 text-5ml mb-4"/>,
        title:"3. Donate or rent easily",
        des:"Finalize the arrangement to either donate your item for free or rent it out."
        }
    ]
    return(<>
    |<div className='flex-grow px-6 py-8'>
<h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">How it works</h2>
    </div>
    {
        data.map((itm,idx)=>(<div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
<div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 -mt-10">
<span className="material-symbols-outlined text-white text-4xl">{itm.icons}</span>
</div>
<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{itm.title}</h3>
<p className="text-gray-600 dark:text-gray-400">{itm.des}</p>
</div>))}
    </>);

}