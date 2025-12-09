import { useTheme } from "@/hooks/useTheme";
import { ActivityIndicator, View } from "react-native";
import BaseView from "./BaseView";

export const FullPageLoading = () => {
    const { theme } = useTheme();

    return (
        <BaseView>
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator
                    size="large"
                    color={theme === 'dark' ? '#ffffff' : '#000000'}
                />
            </View>
        </BaseView>
    )
}