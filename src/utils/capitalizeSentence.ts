export default function CapitalizeSentence(sentence:string) {
    const words = sentence.split(" ");
    if(!sentence) return sentence;
    return words.map(word => word.substring(0, 1).toUpperCase() + word.substring(1, sentence.length)).join(" ");
} 