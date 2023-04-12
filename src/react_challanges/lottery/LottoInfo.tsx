import React, { FC } from 'react'
type InfoDivProps = {
  title: string
  odds: string
  prize: string
}
const LottoInfo = () => {
  const style = {
    mainDiv: `flex flex-col  p-10 max_sm:gap-5  gap-10 justify-center`,
    infoDiv: `flex  px-5 items-center justify-between text-[1.3rem] text-gray-500 max_sm:text-[1rem] max_sm:px-1 border-b-2`,
  }

  const InfoDivs: FC<InfoDivProps> = ({ title, odds, prize }) => {
    return (
      <div className={style.infoDiv}>
        <h1>{title}</h1>
        <div className="flex gap-20 max_sm:gap-10">
          <h1 className="w-[3rem] flex text-start  ">{odds}</h1>
          <h1 className="w-[5rem]">{prize}</h1>
        </div>
      </div>
    )
  }
  return (
    <div className={style.mainDiv}>
      <InfoDivs title="Match" odds="Odds (1 in..) " prize="Prize " />
      <InfoDivs title="5 Numbers " odds="11,688,054 " prize="$400,000.00 " />

      <InfoDivs
        title="4 Numbers + 1 Powerball "
        odds="913,129 "
        prize="$50,000.00 "
      />
      <InfoDivs title="4 Numbers " odds="36,525 " prize="$100.00 " />
      <InfoDivs
        title="3 Numbers + 1 Powerball "
        odds="14,494 "
        prize="$100.00 "
      />
      <InfoDivs title="3 Numbers " odds="580 " prize="$7.00" />
      <InfoDivs title="2 Numbers + 1 Powerball " odds="701 " prize="$7.00 " />
      <InfoDivs title="1 Number + 1 Powerball " odds="92 " prize="$4.00 " />
      <InfoDivs title="0 Numbers + 1 Powerball " odds="38 " prize="$4.00 " />
    </div>
  )
}

export default LottoInfo
