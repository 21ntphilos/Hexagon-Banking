import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import { topCategoryStyles } from "../../../constants";
import { cn } from "@/lib/utils";

const Category = ({ category }: CategoryProps) => {
    const {
        bg,
        circleBg,
        text: { main, count },
        progress: { bg: progressBg, indicator },
        icon,
    } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
        topCategoryStyles.default;

    return (
        <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>

            <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
                <Image src={icon} width={20} height={20} alt={category.name} />
            </figure>

            <div className="flex flex-col w-full gap-2 flex-1">

                <div className="flex justify-between text-14">
                    <h1 className={cn("font-semibold", main)}>{category.name}</h1>
                    <h2 className={cn("font-normal", count)}>{category.count}</h2>
                </div>

                <Progress
                    value={Math.ceil((category.count / category.totalCount) * 100)}
                    className={cn("h-2 w-full", progressBg)}
                    indicatorClassName={cn("h-2 w-full", indicator)}
                />

            </div>
        </div>


    )
}

export default Category