import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CustomerAlbumDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: string[];
};

export function CustomerAlbumDialog({ open, onOpenChange, title, images }: CustomerAlbumDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-primary">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="overflow-hidden rounded-xl border border-border bg-[#f4ece1] shadow-sm"
            >
              <img src={src} alt={`${title} — ảnh ${i + 1}`} className="aspect-square w-full object-cover" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
