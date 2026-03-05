import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  metrics: Record<string, any>;
  relatedLearning: number;
  learningTitle: string;
  impact: string;
}

const PROJECTS_FILE = path.join(process.cwd(), 'src/data/projects.json');

function readProjects(): Project[] {
  try {
    const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeProjects(projects: Project[]): void {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    const projects = readProjects();
    const filtered = projects.filter((p) => p.id !== projectId);

    if (filtered.length === projects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    writeProjects(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
