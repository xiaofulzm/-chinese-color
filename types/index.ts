
declare type ColorItem = {
    name:string
    hex:string
    CMYK:(number| null)[]
    RGB:number[]
    explain:string
}

declare type Colors = {
    subjectColor:string
    color:string
    colors:ColorItem[]
}