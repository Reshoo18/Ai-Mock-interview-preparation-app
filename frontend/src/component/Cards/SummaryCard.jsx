// // import React from 'react'

// // const SummaryCard = ({
// //   colors,
// //   role,
// //   topicsToFocus,
// //   experience,
// //   questions,
// //   description,
// //   lastUpdated,
// //   onSelect,
// //   onDelete,
// // }) => {
// //   return (
// //     <div
// //       className="p-4 rounded-xl shadow-md cursor-pointer"
// //       style={{ background: colors }}
// //       onClick={onSelect}
// //     >
// //       <h2 className="text-lg font-semibold">{role}</h2>

// //       <p className="text-sm text-gray-700 mt-1">
// //         {description}
// //       </p>

// //       <div className="text-sm mt-2">
// //         <p><strong>Topics:</strong> {topicsToFocus}</p>
// //         <p><strong>Experience:</strong> {experience}</p>
// //         <p><strong>Questions:</strong> {questions}</p>
// //       </div>

// //       <p className="text-xs text-gray-500 mt-3">
// //         Last Updated: {lastUpdated}
// //       </p>

// //       <button
// //         onClick={(e) => {
// //           e.stopPropagation()
// //           onDelete()
// //         }}
// //         className="mt-3 text-red-500 text-sm"
// //       >
// //         Delete
// //       </button>
// //     </div>
// //   )
// // }

// // export default SummaryCard

// const SummaryCard = ({ colors, role, description, lastUpdated, onSelect }) => {
//   return (
//     <div
//       onClick={onSelect}
//       className="p-4 rounded-xl shadow cursor-pointer"
//       style={{ background: colors }}
//     >
//       <h3 className="font-semibold">{role}</h3>
//       <p className="text-sm mt-1">{description}</p>
//       <p className="text-xs text-gray-500 mt-2">
//         Updated: {lastUpdated}
//       </p>
//     </div>
//   );
// };

// export default SummaryCard;

import React from 'react'

const SummaryCard  =({
    colors,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,
})=>{
        return <div className='bg-white ' onClick={onSelect}>
            <div className='' style={{background:colors.bgcolor,}}>
                <div className=''>
                    <div className=''>
                        <span className=''>
                            GU
                        </span>
                    </div>

                    <div className=''>
                        <div className=''>
                              
                          <div>
                            <h2 className=''>{role}</h2>
                            <p className=''>{topicsToFocus} </p>
                          </div>

                        </div>
                    </div>
                </div>
                <button className='' onClick={(e)=>{e.stopPropagation();
                    onDelete();
                }}>
                    delete
                </button>
            </div>
              <div className=''>
                <div className=''>
                    <div>
                    Experience:{experience}{experience==1 ? "year" : "years"}
                </div>

                <div className=''>
                    {questions} Q&A
                </div>
                  
                  <div className=''>
                    Last Updated:{lastUpdated}
                  </div>
              </div>

              <p className=''>
                {description}
              </p>
        </div>
        </div>
    };
  


export default SummaryCard