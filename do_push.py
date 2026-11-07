import subprocess, sys

sys.stdout.reconfigure(encoding='utf-8')
cwd = r'C:\Users\Chien\Desktop\ATG\PRJ\KED'

def run_cmd(args):
    print(f">> {' '.join(args)}", flush=True)
    r = subprocess.run(args, cwd=cwd, capture_output=True, text=True)
    if r.stdout:
        print(r.stdout.strip(), flush=True)
    if r.stderr:
        print("STDERR:", r.stderr.strip(), flush=True)
    return r.returncode

print("Staging files...", flush=True)
run_cmd(['git', 'add', '.'])

print("Committing...", flush=True)
run_cmd(['git', 'commit', '-m', 'feat(core): initial release v6.4.0 of KED interactive preschool learning platform'])

print("Pushing to origin main...", flush=True)
code = run_cmd(['git', 'push', '-u', 'origin', 'main'])
print("Push exit code:", code, flush=True)
