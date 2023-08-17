import { SplashScreen, Stack } from "expo-router"
import { useCallback } from "react"
import { useFonts } from "expo-font"
import * as splashscreen from 'expo-splash-screen'



SplashScreen.preventAutoHideAsync(); // Makes the splash screen visible 

const Layout = () => {
    const [ fontsLoaded ] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
    })

    const onLayourtRootView = useCallback(async() => {
        if(fontsLoaded){
            await splashscreen.hideAsync();
        }
    }, [ fontsLoaded ])


    if(!fontsLoaded) return null;
    return <Stack 
    onLayrout={onLayourtRootView}
    />
}

export default Layout;