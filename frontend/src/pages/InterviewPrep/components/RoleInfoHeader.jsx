import React from 'react'

const RoleInfoHeader = ({
    role,
      topicsToFocus,
      experience,
      questions,
      description,
      lastUpdated
}) => {
  return (
    <div className=''>
      <div className=''>
        <div className=''>
            <div className=''>
                <div className=''>
                    <div className=''>
                        <div className=''>
                             
                             <h2 className=''>{role}</h2>
                             <p className=''>
                                {topicsToFocus}
                             </p>

                        </div>
                    </div>
                </div>
            </div>

            <div className=''>
                <div className=''>
                     Experience: {experience} {experience ==1 ? "Year" : "Years"}
                </div>
                  
                  <div className=''>
                    {questions} Q&A
                     
                  </div>
                  <div className=''>
                     Last Updated: {lastUpdated}
                  </div>
            </div>
      </div>

      </div>
    </div>
  )
}

export default RoleInfoHeader
