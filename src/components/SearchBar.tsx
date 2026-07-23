type Props = {
    onSearchInput: (e: Event) => void;
    query: () => string;
    setQuery: (value: string) => void;
    placeholderText: string;
};

export default function SearchBar({ onSearchInput, query, setQuery, placeholderText }: Props) {
    return (<div class="relative">
        <svg class="absolute size-6 left-2 top-[0.45rem] stroke-neutral-400 dark:stroke-neutral-500 pointer-events-none">
            <use href={`/ui.svg#search`} />
        </svg>
        <input name="search" type="text" value={query()} onInput={onSearchInput} autocomplete="off" spellcheck={false} placeholder={placeholderText} class="mac-input h-10 w-full rounded-lg px-10 outline-none placeholder-neutral-400 dark:placeholder-neutral-500 text-black dark:text-white" />
        {query().length > 0 && (
            <button
                onClick={() => setQuery("")}
                class="absolute flex cursor-pointer justify-center items-center h-full w-10 right-0 top-0 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300"
            >
                <svg class="size-5">
                    <use href={`/ui.svg#x`} />
                </svg>
            </button>
        )}
    </div>)
}