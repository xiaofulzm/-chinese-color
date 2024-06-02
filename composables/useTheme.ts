

export default function () {
    return useState('theme',()=>{
            const themeType = getTheme() as string;
            return themeType;
    })
}