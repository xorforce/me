import { SubpageShell } from "@/components/subpage-shell"
import TilContent from "@/data/til.mdx"

export default function TodayILearnt() {
  return (
    <SubpageShell
      title="Today I Learnt"
      description="A small, running log of daily notes, tips, and reminders I pick up along the way."
      showFooterBorder
    >
      <div className="til-content site-body-copy space-y-6">
        <TilContent />
      </div>
    </SubpageShell>
  )
}
