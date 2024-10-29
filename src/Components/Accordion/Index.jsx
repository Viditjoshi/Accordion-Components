import { useState } from "react";
import data from "./data";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleMultipleSelection = (id) => {

        let CpyMutiple = [...multiple];
        const finndIndexOfCurrentId = CpyMutiple.indexOf(id)
        if (finndIndexOfCurrentId === -1) CpyMutiple.push(id)
        else CpyMutiple.splice(finndIndexOfCurrentId, 1); //remove the current element that we are getting from multiple list
        setMultiple(CpyMutiple)


    }
    const handleSingleSelection = (id) => {

        setSelected(selected === id ? null : id); // Toggle selection

    };

    return (
        <div className="text-black p-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-4 font-Libre text-[#023047]">Single Selection</h2>
                <button className={`rounded-xl p-2 text-white font-Libre text-sm ${enableMultipleSelection === true ? 'bg-green-700' : 'bg-red-700'} `} onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}>
                    {enableMultipleSelection === true ?
                        <div>Multi Selection On</div> :
                        <div>Multi Selection Off</div>}
                </button>
            </div>
            <div className="space-y-2">
                {data && data.length === 0 ? (
                    <div className="text-gray-500">No Data Found</div>
                ) : (
                    data.map((dataitem) => (
                        <div key={dataitem.id} className="border border-gray-300 rounded-lg p-4 bg-[#8ecae6] text-[#023047]  shadow-sm">
                            <div
                                onClick={enableMultipleSelection ? () => handleMultipleSelection(dataitem.id) : () => handleSingleSelection(dataitem.id)}
                                className="cursor-pointer flex justify-between items-center"
                            >
                                <h3 className="text-lg font-Libre">{dataitem.question}</h3>
                                <span className="text-2xl">
                                    {selected === dataitem.id ? <IoIosRemoveCircleOutline /> : <IoAddCircleOutline />}
                                </span>
                            </div>
                            <div className='transition-all duration-300 ease-in-out overflow-hidden max-h-96 opacity-100' >
                                {
                                    enableMultipleSelection ? multiple.indexOf(dataitem.id) !== -1 && (<div className="mt-2 text-[#023047]  font-mono ">{dataitem.answer}</div>) : selected === dataitem.id && (<div className="mt-2 text-[#023047]  font-mono ">{dataitem.answer}</div>)

                                }
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Accordion;
