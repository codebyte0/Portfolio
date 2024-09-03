import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'

const Grid = () => {
  return (
    <section id='about'>
        <BentoGrid>
            {gridItems.map(({ id, title, description, className, img, imgClassName}) => (
                <BentoGridItem id={id} key={id} title={title} description={description} className={className} 
                img={img} imgClassName={imgClassName} />
            ))}
        </BentoGrid>
      
    </section>
  )
}

export default Grid
