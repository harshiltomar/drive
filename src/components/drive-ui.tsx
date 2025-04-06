"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Folder, HardDrive, ImageIcon, Search, Share2, Star, Trash2, Upload, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

// Mock data for files and folders
const mockData = {
  root: [
    { id: "folder1", name: "Documents", type: "folder", size: "-", modified: "Apr 2, 2024", shared: true },
    { id: "folder2", name: "Images", type: "folder", size: "-", modified: "Mar 28, 2024", shared: false },
    {
      id: "file1",
      name: "Project Proposal.docx",
      type: "document",
      size: "2.3 MB",
      modified: "Apr 5, 2024",
      shared: true,
    },
    { id: "file2", name: "Budget.xlsx", type: "spreadsheet", size: "1.8 MB", modified: "Apr 1, 2024", shared: false },
    { id: "file3", name: "Logo.png", type: "image", size: "4.2 MB", modified: "Mar 25, 2024", shared: false },
  ],
  folder1: [
    {
      id: "file4",
      name: "Meeting Notes.docx",
      type: "document",
      size: "1.1 MB",
      modified: "Apr 4, 2024",
      shared: false,
    },
    { id: "file5", name: "Contract.pdf", type: "pdf", size: "3.5 MB", modified: "Mar 30, 2024", shared: true },
    { id: "folder3", name: "Projects", type: "folder", size: "-", modified: "Mar 15, 2024", shared: false },
  ],
  folder2: [
    { id: "file6", name: "Vacation.jpg", type: "image", size: "5.7 MB", modified: "Feb 20, 2024", shared: false },
    { id: "file7", name: "Team Photo.png", type: "image", size: "8.2 MB", modified: "Mar 10, 2024", shared: true },
  ],
  folder3: [
    { id: "file8", name: "Project Timeline.pdf", type: "pdf", size: "2.8 MB", modified: "Mar 12, 2024", shared: false },
  ],
}

export function DriveUI() {
  const [currentFolder, setCurrentFolder] = useState("root")
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: "root", name: "My Drive" }])

  // Function to navigate into a folder
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId)
    setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }])
  }

  // Function to navigate via breadcrumb
  const navigateToBreadcrumb = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1)
    setBreadcrumbs(newBreadcrumbs)
    setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1].id)
  }

  // Mock upload function
  const handleUpload = () => {
    alert("Upload functionality would open a file picker in a real application")
  }

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <Folder className="h-5 w-5 text-yellow-500" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "spreadsheet":
        return <FileText className="h-5 w-5 text-green-500" />
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-semibold text-xl">
          <HardDrive className="h-6 w-6" />
          <span>My Drive</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search in Drive" className="w-64 pl-8" />
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 border-r p-4">
          <div className="mb-6">
            <Button onClick={handleUpload} className="w-full gap-2" size="sm">
              <Upload className="h-4 w-4" />
              New Upload
            </Button>
          </div>
          <nav className="grid gap-1">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => {
                setCurrentFolder("root")
                setBreadcrumbs([{ id: "root", name: "My Drive" }])
              }}
            >
              <HardDrive className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Share2 className="h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Star className="h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
          </nav>
          <Separator className="my-4" />
          <div className="text-sm text-muted-foreground">
            <div className="mb-2 flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Storage: 43% used</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-[43%] rounded-full bg-green-500" />
            </div>
            <div className="mt-1">4.3 GB of 10 GB used</div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-4 flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && <span className="mx-1 text-muted-foreground">/</span>}
                <Button variant="link" className="h-auto p-0" onClick={() => navigateToBreadcrumb(index)}>
                  {crumb.name}
                </Button>
              </div>
            ))}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead>Shared</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData[currentFolder as keyof typeof mockData]?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.type === "folder" ? (
                      <Button
                        variant="ghost"
                        className="h-auto p-0 flex items-center gap-2"
                        onClick={() => navigateToFolder(item.id, item.name)}
                      >
                        {getFileIcon(item.type)}
                        {item.name}
                      </Button>
                    ) : (
                      <Link href="#" className="flex items-center gap-2">
                        {getFileIcon(item.type)}
                        {item.name}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.modified}</TableCell>
                  <TableCell>
                    {item.shared && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Shared
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  )
}

