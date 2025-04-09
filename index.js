import path from 'path';
import fs from 'fs/promises';

async function printDirectoryTree(dir, indent = '') {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      const isDirectory = file.isDirectory();
      let includes = ['node_modules', 'dist', '.gradle','.idea', 'build', 'test', 'gradle','.test','.vitepress','.git','.vscode','.github','.storybook','public','.nyc_output','.husky','.dumi'];   
      if (isDirectory && !includes.includes(file.name)) {
        console.log(`${indent}├── ${file.name}`);
        await printDirectoryTree(filePath, indent + '│   ');
      } else {
        console.log(`${indent}├── ${file.name}`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

const projectDir = './'; // 替换为你的项目目录路径
console.log('项目文件树:');
printDirectoryTree(projectDir);