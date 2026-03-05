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

export async function GET() {
  try {
    const projects = readProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProject: Project = await request.json();
    const projects = readProjects();

    // Generate new ID if not provided
    if (!newProject.id) {
      newProject.id = Math.max(...projects.map((p) => p.id), 0) + 1;
    }

    projects.push(newProject);
    writeProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProject: Project = await request.json();
    const projects = readProjects();

    const index = projects.findIndex((p) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    projects[index] = updatedProject;
    writeProjects(projects);

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    const projects = readProjects();
    const filtered = projects.filter((p) => p.id !== id);

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
