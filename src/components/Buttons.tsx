import Ionicons from '@expo/vector-icons/Ionicons'
import { Pressable } from 'react-native'

type DeleteButtonProps = {
    onPress: () => void
}

export const DeleteButton = ({ onPress }: DeleteButtonProps) => {
    return (
        <Pressable className='p-2' onPress={onPress}>
            <Ionicons
                className='text-red-600'
                color={'#DC2626'}
                name='trash'
                size={24}
            />
        </Pressable>
    )
}