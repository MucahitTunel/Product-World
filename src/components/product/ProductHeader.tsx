import React, { memo } from 'react'
import AppText from '../AppText'

type Props = {
    title: string
}

const ProductHeader = (props: Props) => {
    return (
        <AppText weight='bold' variant='sm'>
            {props.title.toUpperCase()}
        </AppText>
    )
}

export default memo(ProductHeader)